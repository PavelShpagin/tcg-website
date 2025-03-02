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
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
        return;
      }
      if (data.user) {
        const response = await fetch(
          `/api/users/${data.user.id}`//${process.env.NEXT_PUBLIC_BASE_URL}
        );
        const result = await response.json();
        setUser(result.user);
      }
      setLoading(false);
    };

    // Fetch user on initial load
    fetchUser();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        fetchUser();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <>
      {!loading && // Only display after loading is complete
        (user ? (
          <div className="flex items-center mr-1 md:mr-0">
            <UserIcon data={user} />
          </div>
        ) : (
          <div className="flex items-center">
            <LoginButton setLoading={setLoading} />
          </div>
        ))}
    </>
  );
};

export default AuthStatus;
