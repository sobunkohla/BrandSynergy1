import { redirect } from "next/navigation";

import { Check, ChevronsUpDown, LayoutDashboard, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import Heading from "@/components/custom/heading";
import { FaBullseye, FaFastForward, FaUser } from "react-icons/fa";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib";
import { IconBadge } from "@/components/custom/icon-badge";

import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Delete from "./_components/delete";


const MarketSpaceProfile = async ({
  params,
}: {
  params: { bsid: string; };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const marketspace = await db.marketSpace.findUnique({
    where: {
      id: params.bsid,
      userId,
    },
  });

 
  if (!marketspace) {
    return redirect("/");
  }

  
 
  
 
  

  return (
    <div className="  min-h-screen h-full p-4">
      <div className="container space-y-6 ">
        <div className="space-y-2  ">
          <Heading
            description=" Manage your Business strategy tailored to revolutionise business strategy "
            title="Business Strategy"
            icon={FaUser}
            bgColor="bg-orange-200"
            iconColor="text-orange-600"
          />
          <div className="flex items-center  justify-between gap-x-4 ">
          <Link href={`/projects/`}>
            <Button className="bg-orange-500">
                Back to spaces
            </Button>
            </Link>

            <div className=" flex items-center justify-center gap-x-2">
            <Link href={`/projects/${marketspace.id}/strategies`}>
            <Button className="bg-orange-500">
                go to Strategies
            </Button>
            </Link> 
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 ">Delete Strategy</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Space</DialogTitle>
              <DialogDescription>
              Delete Market profile.note that this action will be permanent. are you sure you want to proceed?
              </DialogDescription>
            </DialogHeader>
            <div className=" w-full py-4">
              <div className=" w-full flex justify-center items-center gap-4">
                <Delete
                  marketSpace={marketspace}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      
   </div>
          </div>
        </div>
        <div>
          <div className=" border-b py-2 border-gray-200">
            <h1 className="font-bold">Market Space Profile</h1>
          </div>

          <Dialog>
      <DialogTrigger asChild>
          <div className="rounded-lg cursor-pointer hover:bg-gray-200 px-8 py-4 flex items-center justify-between ">
            <div className=" flex items-center justify-end">
              <div className="flex   items-center  justify-between rounded-full p-4 bg-orange-400 text-2xl font-extrabold text-white ">
                {marketspace.businessName[0].toUpperCase()}{marketspace.businessName[marketspace.businessName.length - 1].toUpperCase()}
              </div>
              <p className="ml-4 font-bold text-lg">{marketspace.businessName}</p>
            </div>
            <FaBullseye className="text-orange-600" />
          </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Edit Market space profile.note that this action updated all strategies you create from now onwards
          </DialogDescription>
        </DialogHeader>
        <div className=" w-full py-4">
          <div className=" w-full flex justify-center items-center gap-4">
            <Link href={`/projects/new/${marketspace.id}`}>
          <Button type="button" className="" >Edit</Button>
            </Link>
          </div>

        </div>
      </DialogContent>
    </Dialog>

        </div>
        <div>
          <div className=" border-b py-2 border-gray-200">
            <h1 className="font-bold">Market Space info</h1>
          </div>
          <div className="rounded-lg hover:bg-gray-200 px-8 py-4 flex items-center justify-between ">
            <div className=" flex items-center justify-end">
              <h2 className="font-medium text-xl">{marketspace.businessName}</h2>
            </div>
            <p className="text-gray-600 sext-sm font-medium"> title</p>
          </div>
          <div className="rounded-lg hover:bg-gray-200 px-8 py-4 flex items-center justify-between ">
            <div className=" flex items-center justify-end">
              <h3 className="font-medium text-lg">{marketspace.businessType}</h3>
            </div>
            <p className="text-gray-600 sext-sm font-medium"> type</p>
          </div>
          <div className="rounded-lg  px-8 py-4  ">
            <div className=" mb-2 ">
              <h2 className="font-medium text-lg">Goals</h2>
            </div>
            <p className="text-gray-600 sext-sm font-medium">
              {" "}
              {marketspace.businessGoals}
            </p>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default MarketSpaceProfile;
