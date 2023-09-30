'use client'

import { Button } from "@/components/ui/button"
import axios from "axios"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"




export default function Delete() {
const router = useRouter();
const [isLoading, setIsLoading] = useState(false)
function toggleLoading() {
  setIsLoading(prev => !prev);
   }

    async function  deleteStrategy() {
        try {
          toggleLoading() 
            await axios.delete(`/api/profile/actions` )
            toggleLoading()  
            toast.success("Profile  deleted successfully");
            router.refresh();
            router.push(`/personal`);
        } catch  {
          toast.error('something went wrong')
        }
        }
  return (
    <>
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isLoading ? "block" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <Loader className="text-white animate-spin" size={48} />
    </div>
    <Button className="bg-orange-500 mb-4"
            onClick={deleteStrategy}>
                Delete Profile
     </Button>
    </>
  )
}