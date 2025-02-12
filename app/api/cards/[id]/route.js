import "server-only";

import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const userId = params.id;
  console.log(userId);

  const supabase = createClient();

  // Fetch cards from the "minions" table for the given user.
  const { data: minions, error: errorMinions } = await supabase
    .from("minions")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (errorMinions) {
    return NextResponse.json({ error: errorMinions.message }, { status: 500 });
  }

  // Fetch cards from the "spells" table for the given user.
  const { data: spells, error: errorSpells } = await supabase
    .from("spells")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (errorSpells) {
    return NextResponse.json({ error: errorSpells.message }, { status: 500 });
  }

  // Fetch cards from the "stages" table for the given user.
  const { data: stages, error: errorStages } = await supabase
    .from("stages")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (errorStages) {
    return NextResponse.json({ error: errorStages.message }, { status: 500 });
  }

  // Combine all fetched cards into a single array.
  const combinedCards = [
    ...(minions || []),
    ...(spells || []),
    ...(stages || []),
  ];

  // Sort the cards by creation time (newest first).
  combinedCards.sort(
    (a, b) =>
      new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
  );
  console.log(combinedCards);

  return NextResponse.json(combinedCards, { status: 200 });
}
