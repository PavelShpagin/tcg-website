"use client";

import { createClient } from "@/utils/supabase/client"; // Ensure you have a Supabase client instance
import { loginWithDiscord } from "@/app/actions"; // Adjust the import path if needed
import { Button } from "@components/ui/button";

export default function LoginButton() {
  const supabase = createClient();
  const handleLogin = async () => {
    try {
      const url = await loginWithDiscord(); // Call the server-side function
      console.log(url);
      const authTab = window.open(url, "_blank"); // Open a new tab

      if (authTab) {
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (event === "SIGNED_IN") {
              authTab.close();
              //authListener.unsubscribe(); // Clean up the listener
            }
          }
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to initiate login. Please try again.");
    }
  };

  return (
    <div>
      <Button className="button-login" onClick={handleLogin}>
        Log In
      </Button>
    </div>
  );
}
