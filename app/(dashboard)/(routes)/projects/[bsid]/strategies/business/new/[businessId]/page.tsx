

import { redirect } from "next/navigation";

import { Check, ChevronsUpDown, LayoutDashboard, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import Heading from "@/components/custom/heading";
import { FaFastForward } from "react-icons/fa";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib";
import { IconBadge } from "@/components/custom/icon-badge";
import FormPage from "./_components/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";



const BusinessStrategyQuestionnairePage =  async({
  params,
}: {
  params: { bsid: string, businessId: string};
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

        const businessstrategy = await db.businessStrategy.findUnique({
          where: {
            id: params.businessId,
           marketSpaceId: params.bsid,
          },
        });


        
  
        if (!marketspace) {
          return redirect("/");
        }

        
        if (!businessstrategy) {
          return redirect("/");
        }

 
  return (
    <div className="container mx-auto p-8">
      <Heading
        title="Get your business strategy"
        description="flourish on your busines ventures with our insight "
        icon={FaFastForward}
        iconColor="text-green-600"
        bgColor="bg-green-100"
      />
      <h1 className="text-3xl font-semibold mb-6">
        Business Strategy Questionnaire
        <div className="flex py-8  justify-between items-center">
          <div className="flex items-center">
          <IconBadge icon={LayoutDashboard} /> 
        <h2 className="ml-4">Business Strategy details </h2>
          </div>
        <Link href={`/projects/${marketspace.id}/strategies/business/${businessstrategy.id}`}>
          <Button className="bg-orange-600">
            Go to stratgy profile
          </Button>
        </Link>
        </div>
        <div>
          <FormPage
          marketSpace={marketspace}
          businessStrategy={businessstrategy}
          userId={userId}
          />
        </div>

      </h1>

     
    </div>
  );
};

export default BusinessStrategyQuestionnairePage;
