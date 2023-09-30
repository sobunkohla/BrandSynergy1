'use client'

import NavBar from "@/components/custom/navbar";
import SideBar from "@/components/custom/sidebar";


export default function layout({
    children
} : {
    children: React.ReactNode;
}) {



  return (
    <div className="h-full relative ">
        <div className="hidden h-full lg:flex lg:w-72 lg:flex-col 
        lg:fixed lg:inset-y-0 z-[80]  bg-gray-900">
            <SideBar/>
        </div>
        <main className="lg:pl-72  ">
            <NavBar/>
            {children}
        </main>
    </div>
  )
}
