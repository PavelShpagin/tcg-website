"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Adjust the import based on your setup
import UserIcon from "./user-icon";
import LoginButton from "./login-button";

const AuthStatus = () => {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false); // Set loading to false after fetching user
    };

    // Fetch user on initial load
    fetchUser();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null); // Update user state based on session
      setLoading(false); // Ensure loading is false on auth state change
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      {!loading && // Only display after loading is complete
        (user ? (
          <div className="flex items-center mr-1 md:mr-0">
            <UserIcon data={user} />
          </div>
        ) : (
          <div className="flex items-center">
            <LoginButton />
          </div>
        ))}
    </>
  );
};

export default AuthStatus;
