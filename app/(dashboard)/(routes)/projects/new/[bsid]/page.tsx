
import { db } from "@/lib";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/custom/icon-badge";
import { LayoutDashboard, ListChecks, PersonStanding, User2Icon } from "lucide-react";
import TitleForm from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import {LocationForm}  from "./_components/location-form";
import { IndustryForm } from "./_components/industry-form";
import { BusinessTypeForm } from "./_components/business-type-form";
import {  TargetAudienceForm } from "./_components/audience-form";
import { BusinessGoalsForm } from "./_components/business-goals-form";
import { ProductsServicesForm } from "./_components/product-form";
import { UniqueSellingPropositionForm } from "./_components/usp-form";
import { InvestmentForm } from "./_components/investment-form";
import { TeamForm } from "./_components/team-form";
import { YearFoundedForm } from "./_components/year-founded-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CreateMarketSpacePage = async ({
  params,
}: {
  params: { bsid: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const marketspace = await db.marketSpace.findUnique({
    where: {
      id: params.bsid,
      userId
    },
  });

  if (!marketspace) {
    return redirect("/");
  }

  const requiredFields = [
    marketspace.businessName,
    marketspace.location,
    marketspace.description,
    marketspace.industry,
    marketspace.businessType,
    marketspace.yearFounded,
    marketspace.businessGoals,
    marketspace.targetAudience,
    marketspace.productsServices,
    marketspace.team,
    marketspace.uniqueSellingProposition,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">MarketSpace setup</h1>
          <span className="text-sm text-slate-700">
            complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
        <div>
          <div className="flex items-center flex-wrap gap-x-2 ">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your Market Space</h2>

          </div>
          <div className="items-center ml-4 pt-8 flex gap-x-2">
              <IconBadge  icon={LayoutDashboard} />
              <h2 className="text-xl"> MarketSpace Data </h2>
            </div>
          <TitleForm
          initialData={marketspace}
          marketspaceId={marketspace.id}
          />
           <DescriptionForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
            <LocationForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />

<div className="items-center ml-4 pt-8 flex gap-x-2">
              <IconBadge  icon={LayoutDashboard} />
              <h2 className="text-xl"> Idustry Data </h2>
            </div>
            <IndustryForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
            <BusinessTypeForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
            <BusinessGoalsForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
           
        </div>
        <div className="space-y-6">
          <div >
            <div className="items-center  flex gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Business Insight</h2>
            </div>
            <div className="items-center ml-4 pt-8 flex gap-x-2">
              <IconBadge  icon={PersonStanding} />
              <h2 className="text-xl">Audience Data</h2>
            </div>
            <TargetAudienceForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
            <div className="items-center ml-4 pt-8 flex gap-x-2">
              <IconBadge  icon={LayoutDashboard} />
              <h2 className="text-xl"> Business Data </h2>
            </div>
            <ProductsServicesForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
            <UniqueSellingPropositionForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
            <TeamForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
             <InvestmentForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
            <YearFoundedForm
              initialData={marketspace}
              marketspaceId={marketspace.id}
            />
          </div>
        </div>
      </div>
      { completedFields === totalFields && (
        <div className="py-16 w-full flex items-center justify-center">
          <Link href={`/projects/${marketspace.id}/strategies`} >
            <Button className="bg-orange-600 hover:px-10 hover:bg-orange-100 hover:text-black transition-all" size='lg' >
              Proceed
            </Button>
          </Link>
        </div>
        )
      }
    </div>
  );
};

export default CreateMarketSpacePage;
