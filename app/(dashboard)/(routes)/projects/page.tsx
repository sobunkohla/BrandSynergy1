

import React from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import StrategyCard from "@/components/custom/strategy-card";
import Heading from "@/components/custom/heading";
import { FaArrowLeft, FaHandshake, FaPalette } from "react-icons/fa";
import { db } from "@/lib";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import SpaceCard from "@/components/custom/space-card";

// Mock data for demonstration (Replace this with real data fetched from your database)


const MarketSpacesPage = async () => {

    const {userId } = auth();

    if (!userId) {
            return redirect("/");
          }
    
          const marketspaces = await db.marketSpace.findMany({
            where: {
              userId,
            },
          });
  
          
  
  
          
    
          if (!marketspaces) {
            return redirect("/");
          }
  

   

  return (
    <div className="container mx-auto p-6">
      <div className="sm:flex justify-between items-center mb-4">
<Heading title="Market Spaces" description="get access to all your Market Spaces" icon={FaPalette} bgColor="bg-orange-200" iconColor="text-orange-600"/>
<div className="flex items-center gap-x-2">
        
        <Link href={`/projects/new`}>
          <Button className="flex items-center text-white hover:scale-110 active:scale-95 transition-all bg-orange-600 ">
            <PlusIcon size={20} className="mr-2" /> Create a Market Space
          </Button>
        </Link>
</div>

      </div>

      {marketspaces.length === 0 ? (
        <div className="flex flex-col items-center mt-16">
          <PlusIcon size={400} className="text-gray-400 mb-4" />
          <p className="text-xl pb-8 font-semibold text-gray-600">
            No Business Spaces Created
          </p>
          <Link href={`/projects/new`}>
            <Button className="text-white hover:scale-110 active:scale-95 transition-all bg-orange-600 mt-2">
              Create a New Market Space
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4  pt-12 ">
          {marketspaces.map((space) => (
            <SpaceCard space={space} key={space.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketSpacesPage;