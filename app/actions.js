"use server";

import { createClient } from "@/utils/supabase/server";

export async function loginWithDiscord() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/xx/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.url; // Return the URL to the client
}
