"use client";

import { createClient } from "@/utils/supabase/client"; // Ensure you have a Supabase client instance
import { loginWithDiscord } from "@/app/actions"; // Adjust the import path if needed
import { Button } from "@components/ui/button";
import { IoLogInOutline } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";

export default function LoginButton({ setLoading }) {
  const supabase = createClient();
  const { toast } = useToast();
  const handleLogin = async () => {
    try {
      const url = await loginWithDiscord(); // Call the server-side function
      const authTab = window.open(url, "_blank"); // Open a new tab

      if (authTab) {
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (event === "SIGNED_IN") {
              setLoading(true);
              authTab.close();
              //authListener.unsubscribe(); // Clean up the listener
            }
          }
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Failed to initiate login. Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <Button
        className="button-login flex items-center lg:hidden !pr-2 !pl-1 mr-1 md:mr-0"
        onClick={handleLogin}
      >
        <IoLogInOutline className="h-8 w-8" />
      </Button>
      <Button
        className="button-login hidden lg:flex items-center"
        onClick={handleLogin}
      >
        <span className="hidden lg:inline-block">Log In</span>
      </Button>
    </>
  );
}
