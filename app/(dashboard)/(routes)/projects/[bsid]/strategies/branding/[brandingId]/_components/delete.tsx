'use client'

import { Button } from "@/components/ui/button"
import { BrandingStrategy, MarketSpace } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface props {
    brandingStrategy:BrandingStrategy,
    marketSpace:MarketSpace

}


export default function Delete({brandingStrategy, marketSpace} : props) {
const router = useRouter();


    async function  deleteStrategy() {
        try {
         
            await axios.delete(`/api/marketspaces/${marketSpace.id}/brandingstrategies/${brandingStrategy.id}` )
            toast.success("Branding Strategy deleted successfully");
            router.refresh();
            router.push(`/projects/${marketSpace.id}/strategies/branding/`);
        } catch  {
          toast.error('something went wrong')
        }
        }
  return (
    <Button className="bg-orange-500"
            onClick={deleteStrategy}>
                Delete Strategy
     </Button>
  )
}