import { LandingContent } from "@/components/custom/langing-content";
import { LandingHero } from "@/components/custom/langing-hero";
import { LandingNavbar } from "@/components/custom/langing-navbar";

const LandingPage = () => {
  return ( 
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
   );
}
 
export default LandingPage;
