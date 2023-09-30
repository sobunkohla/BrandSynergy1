import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";




export default function StrategyCard({ strategy , marketspaceId}: {
    strategy: {
      id: string;
      marketSpaceId: string;
      title: string;
      description: string | null;
      type: string | null;
      advice: string | null;
      createdAt: Date;
      updatedAt: Date;
    },
    marketspaceId: string
}) {
  return (
    <Link href={`/projects/${marketspaceId}/strategies/business/${strategy.id}`}>
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full "
            >
            <div className=" relative w-full aspect-video rounded-md overflow-hidden">
              <div className="h-full text-white text-[180px] w-full flex items-center justify-center bg-orange-500">
                {strategy.title[0].toUpperCase() }{strategy.title[strategy.title.length -1].toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col pt-2">
              <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                {strategy.title}
                <p className=" text-xs text-muted-foreground">
                  {strategy.type}
                </p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                  <div className="flex items-center gap-x-1 text-slate-500 ">
                    <IconBadge size='sm' icon={BookOpen}/>
                    <span className="">
                      {strategy.updatedAt.toDateString()}
                    </span>
                  </div>
                </div>
                <div className="my-3 flex items-center ml-4 gap-x-2 text-sm md:text-xs">
                <p className=" text-xs w-full truncate text-muted-foreground">
                  Description 
                  <br/>
                 {strategy.description}
                </p>
                </div>
              </div>

            </div>
            </div>
            </Link>
  )
}