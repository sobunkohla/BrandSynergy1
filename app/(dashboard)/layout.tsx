import NavBar from "@/components/custom/navbar";
import SideBar from "@/components/custom/sidebar";


export default function layout({
    children
} : {
    children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col 
        md:fixed md:inset-y-0 z-[80]  bg-gray-900">
            <SideBar/>
        </div>
        <main className="md:pl-72 ">
            <NavBar/>
            {children}
        </main>
    </div>
  )
}
