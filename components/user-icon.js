"use client";

import { createClient } from "@/utils/supabase/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoLogOutOutline } from "react-icons/io5";

const UserIcon = ({ data }) => {
  const supabase = createClient();
  return (
    <div className="relative">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="p-2 h-12 w-12 rounded-xl opacity-50 duration-200 ease-in-out bg-white bg-opacity-15 hover:bg-opacity-30 border-[2.75px] border-gray-300/40 hover:border-gray-300/60 hover:cursor-pointer active:scale-95">
            {/* Placeholder for user icon */}
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem>
            <IoLogOutOutline className="h-auto w-auto mr-1" />
            <button onClick={() => supabase.auth.signOut()}>Log Out</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserIcon;
