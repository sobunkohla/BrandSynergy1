'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface Props  {
    userId: String
}

export default function NewProfile({ userId}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const values = {
    colaborations:'0',
    followers:'0',
    leads:'0',
    posts:'0',
    level:'Beginner'

  }

  function toggleLoading() {
 setIsLoading(prev => !prev);
  }
   async function newProfile () {
    try {
     toggleLoading() 
         await axios.post('/api/profile', values );
     toggleLoading()    
         toast.success("Profile created successfully");
         router.refresh();
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
    <Button onClick={newProfile} className="text-white hover:scale-110 active:scale-95 transition-all bg-orange-600 mt-2">
    Create a New Profile
  </Button>
  </>
  )
}