import "server-only";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createClient();

    const [minions, spells, stages] = await Promise.all([
      supabase
        .from("minions")
        .select("card_img, created_at")
        .eq("is_official", false)
        .eq("is_public", true)
        .order("created_at", { ascending: false }),
      supabase
        .from("spells")
        .select("card_img, created_at")
        .eq("is_official", false)
        .eq("is_public", true)
        .order("created_at", { ascending: false }),
      supabase
        .from("stages")
        .select("card_img, created_at")
        .eq("is_official", false)
        .eq("is_public", true)
        .order("created_at", { ascending: false }),
    ]);

    console.log(minions.data);
    console.log(spells.data);
    console.log(stages.data);

    if (minions.error) throw new Error(minions.error.message);
    if (spells.error) throw new Error(spells.error.message);
    if (stages.error) throw new Error(stages.error.message);

    const [minionsTest, spellsTest, stagesTest] = await Promise.all([
      supabase.from("minions").select("*"),
      supabase.from("spells").select("*"),
      supabase.from("stages").select("*"),
    ]);

    const allImages = [...minions.data, ...spells.data, ...stages.data];
    allImages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    console.log(allImages);

    return new Response(JSON.stringify(allImages), {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0, stale-while-revalidate=0",
        "CDN-Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0, stale-while-revalidate=0",
        Pragma: "no-cache",
        Expires: "0",
      },
      /*headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache'
      }*/
    });
  } catch (error) {
    console.error("Failed to fetch images", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
