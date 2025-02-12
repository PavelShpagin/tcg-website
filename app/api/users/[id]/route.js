import { createClient } from "@utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const supabase = createClient();
  const { data: user, error: errorUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  if (errorUser) {
    return NextResponse.json({ error: errorUser.message }, { status: 500 });
  }

  return NextResponse.json({ user: user }, { status: 200 });
}
