

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



const BrandingStrategyQuestionnairePage =  async({
  params,
}: {
  params: { bsid: string, brandingId: string};
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

        const brandingstrategy = await db.brandingStrategy.findUnique({
          where: {
            id: params.brandingId,
           marketSpaceId: params.bsid,
          },
        });


        
  
        if (!marketspace) {
          return redirect("/");
        }

        
        if (!brandingstrategy) {
          return redirect("/");
        }

 
  return (
    <div className="container mx-auto p-8">
      <Heading
        title="Get your business strategy"
        description="flourish on your branding ventures with our insight "
        icon={FaFastForward}
        iconColor="text-green-600"
        bgColor="bg-green-100"
      />
      <h1 className="text-3xl font-semibold mb-6">
        Branding Strategy Questionnaire
        <div className="flex py-8  justify-between items-center">
          <div className="flex items-center">
          <IconBadge icon={LayoutDashboard} /> 
        <h2 className="ml-4">Branding Strategy details </h2>
          </div>
        <Link href={`/projects/${marketspace.id}/strategies/branding/${brandingstrategy.id}`}>
          <Button className="bg-orange-600">
            Go to stratgy profile
          </Button>
        </Link>
        </div>
        <div>
          <FormPage
          marketSpace={marketspace}
          brandingStrategy={brandingstrategy}
          userId={userId}
          />
        </div>

      </h1>

     
    </div>
  );
};

export default BrandingStrategyQuestionnairePage;
