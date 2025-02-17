import "server-only";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function uploadFileToBucket(file, bucketName) {
  const supabase = createClient();
  const fileContents = await file.arrayBuffer();
  const fileName = `${uuidv4()}.${file.name.split(".").pop()}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(`${fileName}`, Buffer.from(fileContents), {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) throw new Error(uploadError.message);

  return supabase.storage.from(bucketName).getPublicUrl(uploadData.path).data
    .publicUrl;
}

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
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();
    console.log("!!!user", user, userError);

    const data = await request.formData();
    const cardFile = data.get("card_file");
    const imageFile = data.get("image_file");

    const [cardImageUrl, imageUrl, isAdminData] = await Promise.all([
      uploadFileToBucket(cardFile, "official-images/card-images"),
      uploadFileToBucket(imageFile, "official-images/images"),
      (user.user) ? supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", user.user.id)
        .eq("role_id", 1) : null,
    ]);

    const isAdmin = (user.user && isAdminData?.data?.length > 0) || false;

    const type = data.get("type");
    const tableConfig = {
      Minion: {
        table: "minions",
        class_table: "minion_classes",
        table_id: "minion_id",
      },
      Spell: {
        table: "spells",
        class_table: "spell_classes",
        table_id: "spell_id",
      },
      Stage: {
        table: "stages",
        class_table: "stage_classes",
        table_id: "stage_id",
      },
    };

    const { table, class_table, table_id } = tableConfig[type] || {};

    const card = {
      title: data.get("title"),
      description: data.get("description"),
      cost: data.get("cost"),
      card_img: cardImageUrl,
      owner_id: (user.user) ? user.user.id : null,
      img: imageUrl,
      is_official: isAdmin,
      scale: data.get("scale"),
      position_x: JSON.parse(data.get("position")).x,
      position_y: JSON.parse(data.get("position")).y,
      ...(type === "Minion" && {
        health: parseInt(data.get("health"), 10),
        attack: parseInt(data.get("attack"), 10),
        level: parseInt(data.get("level"), 10),
      }),
      ...(type === "Stage" && {
        level: parseInt(data.get("level"), 10),
      }),
    };

    const [classData, cardData] = await Promise.all([
      supabase
        .from("classes")
        .select("id")
        .eq("name", data.get("class"))
        .single(),
      supabase.from(table).insert([card]).select("id"),
    ]);

    if (classData.error) throw new Error(classData.error.message);
    if (cardData.error) throw new Error(cardData.error.message);

    const { error: minionClassError } = await supabase
      .from(class_table)
      .insert({
        [table_id]: cardData.data[0].id,
        class_id: classData.data.id,
      });

    if (minionClassError) throw new Error(minionClassError.message);

    revalidatePath("/cards/custom");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
