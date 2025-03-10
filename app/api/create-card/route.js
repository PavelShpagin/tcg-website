import "server-only";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from 'next/server';
import pako from 'pako';

async function uploadFileToBucket(file, bucketName) {
  console.log("uploadFileToBucket", file, bucketName);
  const supabase = createClient();
  
  if (!file || !(file instanceof Blob)) {
    throw new Error('Invalid file provided');
  }

  const fileContents = await file.arrayBuffer();
  const extension = file.type === 'image/webp' ? 'webp' : 'gz';
  const fileName = `${uuidv4()}.${extension}`;
  
  // Add explicit content type handling
  const contentType = file.type || 'application/octet-stream';
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(`${fileName}`, Buffer.from(fileContents), {
      contentType: contentType,
      upsert: true,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error(uploadError.message);
  }

  return supabase.storage.from(bucketName).getPublicUrl(uploadData.path).data
    .publicUrl;
}

async function decompressFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const decompressed = pako.inflate(arrayBuffer);
  return new Blob([decompressed], { 
    type: file.name.endsWith('.webp.gz') ? 'image/webp' : 'image/png'
  });
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
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    const supabase = createClient();
    const data = await request.formData();
    
    // Add validation for files
    const compressedCardFile = data.get("card_file");
    const compressedImageFile = data.get("image_file");
    
    if (!compressedCardFile || !compressedImageFile) {
      throw new Error('Missing required files');
    }

    // Decompress files
    const cardFile = await decompressFile(compressedCardFile);
    const imageFile = await decompressFile(compressedImageFile);

    // Log file information for debugging
    console.log('Card file:', {
      type: cardFile.type,
      size: cardFile.size,
      originalSize: compressedCardFile.size
    });
    console.log('Image file:', {
      type: imageFile.type,
      size: imageFile.size,
      originalSize: compressedImageFile.size
    });

    const { data: user, error: userError } = await supabase.auth.getUser();
    console.log("user", user, userError);
    // if (userError) throw new Error(userError.message);

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

    revalidatePath('/cards/custom');

    return new Response(JSON.stringify({ success: true, cardData: cardData.data[0] }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Failed to handle the file upload and database operation.", error);
    
    // More detailed error response
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to process request",
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

export const OPTIONS = async (request) => {
  return new NextResponse('', {
    status: 200
  })
}
