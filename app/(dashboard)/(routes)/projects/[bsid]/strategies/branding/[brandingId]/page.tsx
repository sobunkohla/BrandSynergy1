import { redirect } from "next/navigation";

import { Check, ChevronsUpDown, LayoutDashboard, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import Heading from "@/components/custom/heading";
import { FaBullseye, FaFastForward, FaUser } from "react-icons/fa";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib";
import { IconBadge } from "@/components/custom/icon-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Delete from "./_components/delete";

const BusinessProfile = async ({
  params,
}: {
  params: { bsid: string; brandingId: string };
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

  const brandingStrategy = await db.brandingStrategy.findUnique({
    where: {
      id: params.brandingId,
      marketSpaceId: params.bsid,
    },
  });

  if (!marketspace) {
    return redirect("/");
  }

  if (!brandingStrategy) {
    return redirect("/");
  }

  function formatTextWithBold(apiText:string) {
    // Use a regular expression to find text enclosed in double asterisks
    const boldText = apiText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: boldText }} />;
  }

  const formattedText = formatTextWithBold(brandingStrategy?.advice || "");
  // You can style this page using Tailwind CSS classes
  return (
    <div className="  min-h-screen h-full p-4">
      <div className="container space-y-6 ">
        <div className="space-y-2  ">
          <Heading
            description=" Manage your Branding strategy tailored to revolutionize branding  "
            title="Branding Strategy"
            icon={FaUser}
            bgColor="bg-orange-200"
            iconColor="text-orange-600"
          />
          <div className="sm:flex items-center space-y-2  justify-between gap-x-4 ">
            <Link href={`/projects/${params.bsid}/strategies/branding/`}>
              <Button className="bg-orange-500">Back to strategies</Button>
            </Link>
            <div className=" sm:flex gap-x-2  items-center justify-center">
              <Link
                href={`/projects/${params.bsid}/strategies/branding/new/${params.brandingId}`}
              >
                <Button className="bg-orange-500">Edit Strategy</Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 ">Delete Strategy</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete profile</DialogTitle>
                    <DialogDescription>
                      Delete Branding profile.note that this action will be permanent. are you sure you want to proceed?
                    </DialogDescription>
                  </DialogHeader>
                  <div className=" w-full py-4">
                    <div className=" w-full flex justify-center items-center gap-4">
                      <Delete
                        brandingStrategy={brandingStrategy}
                        marketSpace={marketspace}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" border-b py-2 border-gray-200">
          <h1 className="font-bold">Branding Srategy Profile</h1>
        </div>
        <div className="rounded-lg hover:bg-gray-200 px-8 py-4 flex items-center justify-between ">
          <div className=" flex items-center justify-end">
            <div className="flex  items-center  justify-between rounded-full p-4 bg-orange-400 text-2xl font-extrabold text-white ">
              {brandingStrategy.title[0].toUpperCase()}
              {brandingStrategy.title[
                brandingStrategy.title.length - 1
              ].toUpperCase()}
            </div>
            <p className="ml-4 font-bold text-lg">{brandingStrategy.title}</p>
          </div>
          <FaBullseye className="text-orange-600" />
        </div>
      </div>
      <div>
        <div className=" border-b py-2 border-gray-200">
          <h1 className="font-bold">Branding Srategy info</h1>
        </div>
        <div className="rounded-lg hover:bg-gray-200 px-8 py-4 flex items-center justify-between ">
          <div className=" flex items-center justify-end">
            <h2 className="font-medium text-xl">{brandingStrategy.title}</h2>
          </div>
          <p className="text-gray-600 sext-sm font-medium"> title</p>
        </div>
        <div className="rounded-lg hover:bg-gray-200 px-8 py-4 flex items-center justify-between ">
          <div className=" flex items-center justify-end">
            <h3 className="font-medium text-lg">{brandingStrategy.type}</h3>
          </div>
          <p className="text-gray-600 sext-sm font-medium"> type</p>
        </div>
        <div className="rounded-lg  px-8 py-4  ">
          <div className=" mb-2 ">
            <h2 className="font-medium text-lg">Description</h2>
          </div>
          <p className="text-gray-600 sext-sm font-medium">
            {" "}
            {brandingStrategy.description}
          </p>
        </div>
      </div>
      <Heading
        description="get insight from the worlds best sources "
        title="Advice"
        icon={FaUser}
        bgColor="bg-orange-200"
        iconColor="text-orange-600"
      />
      <div className="bg-gray-200 rounded-lg text-sm shadow-inner py-12 px-10 max-h-[70vh] overflow-y-scroll   ">
        {/* Render your advice content here */}
       {formattedText}
      </div>
    </div>
  );
};

export default BusinessProfile;
