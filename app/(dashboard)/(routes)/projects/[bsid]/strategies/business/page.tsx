

import React from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import StrategyCard from "@/components/custom/strategy-card";
import Heading from "@/components/custom/heading";
import { FaArrowLeft, FaHandshake } from "react-icons/fa";
import { db } from "@/lib";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

// Mock data for demonstration (Replace this with real data fetched from your database)


const BusinessStrategiesPage = async ({
    params,
  }: {
    params: { bsid: string };
  }) => {

    const {userId } = auth();

    if (!userId) {
            return redirect("/");
          }
    
          const marketspace = await db.marketSpace.findUnique({
            where: {
              id: params.bsid,
              userId,
            },
          });
  
          const businessstrategies = await db.businessStrategy.findMany({
            where: {
             marketSpaceId: params.bsid,
            },
          });
  
  
          
    
          if (!marketspace) {
            return redirect("/");
          }
  
          
          if (!businessstrategies) {
            return redirect("/");
          }
  
   

  return (
    <div className="container mx-auto p-6">
      <div className="sm:flex justify-between items-center mb-4">
<Heading title="Business Strategies" description="get access to all your business strategies" icon={FaHandshake} bgColor="bg-orange-200" iconColor="text-orange-600"/>
<div className="flex items-center gap-x-2">
<Link href={`/projects/${params.bsid}/strategies/`}>
          <Button className="flex items-center text-white hover:scale-110 active:scale-95 transition-all bg-orange-600 ">
            <FaArrowLeft size={20} className="mr-2" /> Back
          </Button>
        </Link>
        <Link href={`/projects/${params.bsid}/strategies/business/new`}>
          <Button className="flex items-center text-white hover:scale-110 active:scale-95 transition-all bg-orange-600 ">
            <PlusIcon size={20} className="mr-2" /> Create Business Strategy
          </Button>
        </Link>
</div>

      </div>

      {businessstrategies.length === 0 ? (
        <div className="flex flex-col items-center mt-16">
          <PlusIcon size={400} className="text-gray-400 mb-4" />
          <p className="text-xl pb-8 font-semibold text-gray-600">
            No Business Strategies Created
          </p>
          <Link href={`/projects/${params.bsid}/strategies/business/new`}>
            <Button className="text-white hover:scale-110 active:scale-95 transition-all bg-orange-600 mt-2">
              Create a New Business Strategy
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4  pt-12 ">
          {businessstrategies.map((strategy) => (
            <StrategyCard strategy={strategy } marketspaceId={marketspace.id} key={strategy.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessStrategiesPage;