"use client";

import { useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobilesidebar";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <div className="flex items-center border-b p-4">
      <MobileSidebar />
      <div className="flex w-full items-center justify-end">
        {isLoaded && isSignedIn && (
          <>
            <h1 className=" pr-4 font-bold text-lg">{user.fullName}</h1>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </div>
  );
}
