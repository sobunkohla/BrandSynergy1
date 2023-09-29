import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { FaGlobe, FaIndustry } from "react-icons/fa";




export default function SpaceCard({ space }: {
    space: {
        id        :       String  
        userId     :      String
        businessName  :   String
        location       :  String | null,
        description   : string | null,
        industry      : string | null,
        businessType    : string | null,
        investment      : string | null,
        yearFounded      : number | null,
        businessGoals   : string | null,
        targetAudience  : string | null,
        productsServices : string | null,
        uniqueSellingProposition: string | null,
        team : string | null,
        createdAt : Date,
        updatedAt : Date,
}}) {
  return (
    <Link href={`/projects/${space.id}`}>
    <div className="group hover:shadow-sm hover:bg-gray-100 transition overflow-hidden border rounded-lg p-3 h-full "
            >
            <div className=" relative w-full aspect-video rounded-md overflow-hidden">
              <div className="h-full text-white text-[180px] w-full flex items-center justify-center bg-orange-500">
                {space.businessName[0].toUpperCase() }{space.businessName[space.businessName.length -1].toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col pt-2">
              <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                {space.businessName}
                <p className=" text-xs text-muted-foreground">
                  {space.businessType}
                </p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                  <div className="flex items-center gap-x-1 text-slate-500 ">
                    <IconBadge size='sm' icon={FaGlobe}/>
                    <span className="">
                      {space.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-1 text-slate-500 ">
                    <IconBadge size='sm' icon={FaIndustry}/>
                    <span className="text-sm">
                      {space.industry}
                    </span>
                  </div>
              </div>

            </div>
            </div>
            </Link>
  )
}