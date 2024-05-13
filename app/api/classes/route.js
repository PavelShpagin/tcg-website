"use server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const supabase = createClient();
  const response = await supabase.from("classes").select();

  return Response.json(response);
}
