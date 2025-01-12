import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = createClient();

    const [minions, spells, stages] = await Promise.all([
      supabase
        .from("minions")
        .select("card_img, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("spells")
        .select("card_img, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("stages")
        .select("card_img, created_at")
        .order("created_at", { ascending: false }),
    ]);

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

    return new Response(JSON.stringify(allImages), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch images", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
