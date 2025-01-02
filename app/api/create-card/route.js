"use server";

import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.storage
      .from("official-images")
      .list("random");

    if (error) throw error;

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ error: "No images found" }), {
        status: 404,
      });
    }

    const images = data.map((img) => {
      const [className, cardType] = img.name.split("-");
      return {
        name: img.name,
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/official-images/random/${img.name}`,
        class: className.charAt(0).toUpperCase() + className.slice(1),
        type:
          cardType.split(".")[0].charAt(0).toUpperCase() +
          cardType.split(".")[0].slice(1),
      };
    });

    return new Response(JSON.stringify({ images }), {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();

    const type = data.get("Type");
    let table, class_table, table_id;
    if (type === "Minion") {
      table = "minions";
      class_table = "minion_classes";
      table_id = "minion_id";
    } else if (data.get("Type") === "Spell") {
      table = "spells";
      class_table = "spell_classes";
      table_id = "spell_id";
    } else {
      table = "stages";
      class_table = "stage_classes";
      table_id = "stage_id";
    }

    const file = data.get("imageFile");
    if (!file) {
      return new Response(
        JSON.stringify({ error: "No image file provided." }),
        { status: 400 }
      );
    }

    const supabase = createClient();

    const fileContents = await file.arrayBuffer();
    const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("official-images/card-images")
      .upload(`${fileName}`, Buffer.from(fileContents), {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) throw new Error(uploadError.message);

    const imageUrl = supabase.storage
      .from("official-images/card-images")
      .getPublicUrl(uploadData.path).data.publicUrl;

    let card;
    if (type === "Minion") {
      card = {
        title: data.get("CardName"),
        description: data.get("CardText"),
        health: parseInt(data.get("Health"), 10),
        attack: parseInt(data.get("Attack"), 10),
        level: parseInt(data.get("LvL"), 10),
        cost: data.get("Cost"),
        card_img: imageUrl,
        type: "official",
      };
    } else if (type === "Spell") {
      card = {
        title: data.get("CardName"),
        description: data.get("CardText"),
        cost: data.get("Cost"),
        card_img: imageUrl,
        type: "official",
      };
    } else {
      card = {
        title: data.get("CardName"),
        description: data.get("CardText"),
        card_img: imageUrl,
        type: "official",
      };
    }

    const { data: cardData, error: cardError } = await supabase
      .from(table)
      .insert([card])
      .select("id");

    if (cardError) throw new Error(cardError.message);

    const { data: classData, error: classError } = await supabase
      .from("classes")
      .select("id")
      .eq("name", data.get("Class"))
      .single();

    if (classError) throw new Error(classError.message);

    const { error: minionClassError } = await supabase
      .from(class_table)
      .insert({
        [table_id]: cardData[0].id,
        class_id: classData.id,
      });

    if (minionClassError) throw new Error(minionClassError.message);

    return new Response(
      JSON.stringify({ message: "Card created successfully", card: cardData }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Failed to handle the file upload and database operation.",
      error
    );
    return new Response(
      JSON.stringify({ error: error.message || "Failed to process request" }),
      { status: 500 }
    );
  }
}
