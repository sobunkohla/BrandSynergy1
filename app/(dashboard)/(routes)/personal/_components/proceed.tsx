'use client'
import { Button } from "@/components/ui/button"
import { PersonalDev } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


export default function Proceed({PersonalDev} : {
   PersonalDev: PersonalDev
}) {

    const router = useRouter()
    async function proceedD () {
        let values = { 
          level:'Online Presence',
         }
      
        if (PersonalDev?.level === 'Beginner'){
           values = {
            level : 'Online Presence'
          }
        }  if (PersonalDev?.level === 'Online Presence'){
           values = {
            level : 'Content Creation'
          }
        }  if (PersonalDev?.level === 'Content Creation'){
           values = {
            level : 'Networking and Engagement'
          }
        }
         if (PersonalDev?.level === 'Networking and Engagement'){
           values = {
            level : 'Thought Leadership'
          }
        }
      
        if (PersonalDev?.level === 'Thought Leadership'){
          values = {
           level : 'Thought Leadership'
         }
       }
      
        try {
      
          await axios.patch(`/api/profile/actions`, values)
           toast.success("Profile updated successfully");
           router.refresh()
           
        } catch  {
          // toast.error('something went wrong')
        }
       }
  return (
    <Button className="my-4 bg-orange-500 text-white hover:text-white transition hover:bg-red-300" onClick={proceedD}> Procceed to next level</Button>
  )
}
