

import React from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import StrategyCard from "@/components/custom/strategy-card";

// Mock data for demonstration (Replace this with real data fetched from your database)
const mockBusinessStrategies = [
  { id: 1, title: "Business Strategy 1", description: "Description 1" },
  { id: 2, title: "Business Strategy 2", description: "Description 2" },
  // Add more mock data here
];

const BusinessStrategiesPage = ({
    params,
  }: {
    params: { bsid: string };
  }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Business Strategies</h1>
        <Link href={`/projects/${params.bsid}/strategies/business/new`}>
          <Button className="flex items-center text-white hover:scale-110 active:scale-95 transition-all bg-orange-600 ">
            <PlusIcon size={20} className="mr-2" /> Create Business Strategy
          </Button>
        </Link>
      </div>

      {mockBusinessStrategies.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-12 gap-4">
          {mockBusinessStrategies.map((strategy) => (
            <StrategyCard strategy={strategy}key={strategy.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessStrategiesPage;