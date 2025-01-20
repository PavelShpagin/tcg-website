import "server-only";
import { createClient } from "@/utils/supabase/server";

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
