"use client";

import { MainProgress, requirements } from "@/assets/data";
import ProgressCard from "@/components/custom/progresscard";
import ProgressCircle from "@/components/custom/progresscircle";
import ReqCard from "@/components/custom/reqcard";
import Link from "next/link";

const reqCopy = requirements.slice(0, 4);

export default function DashboardPage() {
  return (
    <div className="min-h-[90%] h-full bg-gray-100 p-8">
      <div className=" mb-8 space-y-4 ">
        <h1 className="md:text-5xl text-4xl  font-extrabold  ">Overview</h1>
        <p className="text-muted-foreground font-light text-sm md:text-lg">
          Progress Overview/ <span className="text-orange-600">Analytics</span>
        </p>
      </div>
      <div className="px-4  space-y-4 ">
        <div className="w-full bg-white px-4 py-8 rounded-xl shadow-lg  ">

          <div className=" flex md:flex-row-reverse items-center flex-col sm: space-y-2 ">
            <ProgressCircle />
            <div className="w-full space-y-2  pr-8">
              <div className="flex justify-between items-end ">
                <h2 className="text-2xl text-orange-600   lg:text-4xl font-bold">
                  {" "}
                  Beginner{" "}
                </h2>
                <Link href='/personal'>
                <button className="text-xs px-2 py-2 bg-orange-600 shadow-lg hover:bg-gray-200 hover:text-orange-600 transition-all  text-white rounded-full">
                  Update Branding{" "}
                </button>
                </Link>
              </div>
              <p className=" text-sm text-muted-foreground">
                Personal Branding level
              </p>
              <div className="space-x-4 space-y-2 flex items-center flex-wrap justify-center">
                {reqCopy.map((requirement) => (
                  <ReqCard req={requirement} key={requirement.title} />
                ))}
              </div>
              
            </div>
          </div>
        </div>
        <div className="my-32 w-full  flex items-center flex-wrap justify-around ">
                {MainProgress.map((item) => (
                  <ProgressCard item={item} key={item.title} />
                ))}
              </div>
      </div>
    </div>
  );
}
