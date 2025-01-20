import { createClient } from "@/utils/supabase/server";
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Exchange the auth code for a Supabase session
  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
}
