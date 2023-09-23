import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <div className="flex items-center p-4">
      <Button variant='ghost' className="md:hidden" size='icon'>
        <Menu />
      </Button>
      <div className="flex w-full justify-end"> 
      <UserButton afterSignOutUrl="/"/> 
      </div>
    </div>
  );
}
