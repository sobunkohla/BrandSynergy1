'use client'

import { Button } from "@/components/ui/button"
import {  MarketSpace } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface props {
    marketSpace:MarketSpace

}


export default function Delete({ marketSpace} : props) {
const router = useRouter();


    async function  deleteStrategy() {
        try {
         
            await axios.delete(`/api/marketspaces/${marketSpace.id}` )
            toast.success("Market Space  deleted successfully");
            router.refresh();
            router.push(`/projects/`);
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