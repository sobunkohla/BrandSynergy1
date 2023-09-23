'use client'

import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import SideBar from "./sidebar"
import { useEffect, useState } from "react"



export default function MobileSidebar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <Sheet>
      <SheetTrigger>
      <Button variant='ghost' className="md:hidden" size='icon'>
        <Menu />
      </Button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0'>
     <SideBar/>
      </SheetContent>
    </Sheet>
    
  )
}
