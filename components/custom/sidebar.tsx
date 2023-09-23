"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { FaUser, FaStore, FaPlus, FaCog } from "react-icons/fa";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-orange-500",
  },
  {
    label: "Market Spaces",
    icon: FaStore,
    href: "/projects",
    color: "text-orange-500",
  },
  {
    label: "Personal Brand",
    icon: FaUser,
    href: "/personal",
    color: "text-orange-500",
  },
];
const bottomRoutes = [
  {
    label: " New Market Space",
    icon: FaPlus,
    href: "/projects/new",
    color: "text-orange-500",
  },
  {
    label: "Settings",
    icon: FaCog,
    href: "/settings",
    color: "text-orange-500",
  },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#112127] text-white">
      <div className="px-3 py-2 flex-1 ">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-0 ">
            <Image
              src="/BrandSynergy-logo.png"
              alt="logo"
              width={20}
              height={20}
            />
          </div>
          <h1 className={cn("text-xl font-bold", montserrat.className)}>
            BrandSynergy
          </h1>
        </Link>
        <div className="py-8 flex flex-col h-[90%] justify-between">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                href={route.href}
                key={route.href}
                className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition rounded-lg ", pathname === route.href ? 'bg-white/10  text-white ' : 'text-zinc-400')}
              >
                <div className=" flex flex-1 items-center">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            {bottomRoutes.map((route) => (
              <Link
                href={route.href}
                key={route.href}
                className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition rounded-lg "
              >
                <div className=" flex flex-1 items-center">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
