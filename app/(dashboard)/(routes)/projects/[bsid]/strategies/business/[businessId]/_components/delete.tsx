'use client'

import { Button } from "@/components/ui/button"
import {  BusinessStrategy, MarketSpace } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


interface props {
    businessStrategy:BusinessStrategy,
    marketSpace:MarketSpace

}


export default function Delete({businessStrategy, marketSpace} : props) {
const router = useRouter();


    async function  deleteStrategy() {
        try {
         
            await axios.delete(`/api/marketspaces/${marketSpace.id}/businessstrategies/${businessStrategy.id}` )
            toast.success("Business Strategy Deleted successfully");
            router.refresh();
            router.push(`/projects/${marketSpace.id}/strategies/business/`);
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