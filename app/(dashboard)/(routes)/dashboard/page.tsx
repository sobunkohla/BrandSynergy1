
import ProgressCard from "@/components/custom/progresscard";
import ProgressCircle from "@/components/custom/progresscircle";
import ReqCard from "@/components/custom/reqcard";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib";
import { PlusIcon } from "lucide-react";
import NewProfile from "./_components/new-profile";
import { FaCalendarCheck, FaCheckSquare, FaHandshake, FaRobot, FaUsers } from "react-icons/fa";
import { req } from "@/lib/requirements";






export default async function DashboardPage() {
  const { userId} = auth();



 if (!userId) {
    return redirect("/");
  }

  const PersonalDev = await db.personalDev.findUnique({
    where: {
      userId,
    },
  });


  const marketSpaces = await db.marketSpace.findMany({
    where: {
      userId,
    }

  })

  let requirements = req(PersonalDev);
 let  completed = 0;
 if (requirements.Colaborations.complete) {
  completed += 1;
 }
 if (requirements.Posts.complete) {
  completed += 1;
 }
  
 if (requirements.followers.complete) {
  completed += 1;
 }
 
 if (requirements.leads.complete) {
  completed += 1;
 }

  const MainProgress = [
    {
        title: 'followers',
        number: `${PersonalDev?.followers}`,
        icon: <FaUsers/>,
        
    },
    {
        title: 'posts',
        number: `${PersonalDev?.posts}`,
        icon: <FaCalendarCheck/>,
        
    },
    {
        title: 'Leads',
        number: `${PersonalDev?.leads}`,
        icon: <FaCheckSquare/>,
        
    },
    {
        title: 'Colaborations',
        number: `${PersonalDev?.colaborations}`,
        icon: <FaHandshake/>,
        
    },

]
  return (
    <div className="min-h-[100%] h-full gap-y-4 flex flex-col bg-gray-100 p-8">
    {!PersonalDev ? (
      <>
         <div className="flex flex-col items-center mt-16">
            <PlusIcon size={400} className="text-gray-400 mb-4" />
            <p className="text-xl pb-8 font-semibold text-gray-600">
              No Profile Created
            </p>
           <NewProfile userId={userId}/>
        
          </div>
      </>
      ):(<div>
      <div className=" mb-8 space-y-4 ">
        <h1 className="md:text-5xl text-4xl  font-extrabold  ">Overview</h1>
        <p className="text-muted-foreground font-light text-sm md:text-lg">
          Progress Overview/ <span className="text-orange-600">Analytics</span>
        </p>
      </div>
      <div className="px-4  space-y-4 ">
        <div className="w-full bg-white px-4 py-8 rounded-xl shadow-lg  ">

          <div className=" flex md:flex-row-reverse items-center flex-col sm: space-y-2 ">
            <ProgressCircle comp={completed} />
            <div className="w-full space-y-2  pr-8">
              <div className="flex justify-between items-end ">
                <h2 className="text-2xl text-orange-600   lg:text-4xl font-bold">
                  {" "}
                 {PersonalDev.level}{" "}
                </h2>
                <Link href='/personal'>
                <button className="text-xs px-2 py-2 bg-orange-600 shadow-lg hover:bg-gray-200 hover:text-orange-600 transition-all  text-white rounded-full">
                  Update Branding{" "}
                </button>
                </Link>
              </div>
              <p className=" text-sm text-muted-foreground">
                Personal Branding level Requirements
              </p>
              <div className="gap-x-4 space-y-2 flex items-center flex-wrap justify-center">
                
                  <ReqCard req={requirements.followers}  />
                  <ReqCard req={requirements.Posts}  />
                  <ReqCard req={requirements.Colaborations}  />
                  <ReqCard req={requirements.leads}  />
                
              </div>
              
            </div>
          </div>
        </div>
        <div className="my-32 w-full gap-x-2  flex items-center flex-wrap justify-around ">
                {MainProgress.map((item) => (
                  <ProgressCard item={item} key={item.title} />
                ))}
              </div>
      </div>
      <div className="w-full  my-4 gap-y-4 flex flex-col bg-white px-4 py-8 rounded-xl shadow-lg  ">
        <h1 className=" text-xl font-medium "> Market Spaces</h1>
      <DataTable columns={columns} data={marketSpaces} />
      </div>
    </div>)}
    </div>
  );
}
