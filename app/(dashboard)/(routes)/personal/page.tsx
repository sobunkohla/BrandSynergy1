// pages/profile.tsx

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Heading from "@/components/custom/heading";
import { FaCheckCircle, FaRobot } from "react-icons/fa";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib";
import { redirect } from "next/navigation";
import { ArrowBigRight, MessageSquare, PlusIcon } from "lucide-react";
import NewProfile from "./_components/new-profile";
import FollowersFormPage from "./_components/followers-form";
import PostsFormPage from "./_components/posts-form";
import LeadsFormPage from "./_components/leads-form";
import CollaborationsFormPage from "./_components/colaborations-form";
import UserImage from "./_components/user-image";
import { refresh } from "./_components/refresh";
import axios from "axios";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import Proceed from "./_components/proceed";
import Delete from "./_components/delete";
import { req } from "@/lib/requirements";

const ProfilePage = async() => {

 let isComplete = false;
 const { userId} = auth();



 if (!userId) {
    return redirect("/");
  }

  const PersonalDev = await db.personalDev.findUnique({
    where: {
      userId,
    },
  });

  
  const userData = {
    username: 'JohnDoe',
    userImage: '/path-to-image.jpg',
    currentPosts: 15,
    collaborations: 5,
    leads: 10,
    followers: 100,
    level: 1, // Current level
    requirements: [
      'Complete StrengthsFinder Assessment',
      'Create a Personal Mission Statement',
      // Add more requirements as needed
    ],
  };



 

 let requirements = req(PersonalDev);

 if(requirements.Colaborations.complete && requirements.leads.complete && requirements.followers.complete && requirements.Posts.complete ) {
  isComplete = true;
  
  
 }


  return (
    <div className="container  mx-auto p-8">
      {/* User Info */}
      <Heading
        title="Personal Branding"
        description="Master the digital space with your personal brand advisor"
        icon={FaRobot}
        bgColor="bg-orange-300"
        iconColor="text-orange-600"
      />
    { !PersonalDev ? 
    (
    <>
       <div className="flex flex-col items-center mt-16">
          <PlusIcon size={400} className="text-gray-400 mb-4" />
          <p className="text-xl pb-8 font-semibold text-gray-600">
            No Profile Created
          </p>
         <NewProfile userId={userId}/>
      
        </div>
    </>
    )
     :
     (
     <div className="px-8">
   <UserImage level={PersonalDev.level}/>

    {/* Progress Requirements */}
    <div className="my-6">
      <div className=" flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-2">Progress Requirements (next level)</h2>
        {isComplete && (<Proceed PersonalDev={PersonalDev}/>)}
      </div>
      <Delete/>
        <div className="flex flex-col gap-y-4">
  <div className={`p-4 rounded-lg flex items-center justify-between  ${requirements.followers.complete ? 'bg-green-400' : 'bg-gray-200'}`}>
          <h1> {requirements.followers.number} Followers</h1>
          {requirements.followers.complete && (<FaCheckCircle className='text-green-600'/>)}
        </div>
        <div className={`p-4 rounded-lg flex items-center justify-between  ${requirements.Posts.complete ? 'bg-green-400' : 'bg-gray-200'}`}>
          <h1> {requirements.Posts.number} Posts</h1>
          {requirements.Posts.complete && (<FaCheckCircle className='text-green-600'/>)}
        </div>
        <div className={`p-4 rounded-lg flex items-center justify-between  ${requirements.leads.complete ? 'bg-green-400' : 'bg-gray-200'}`}>
          <h1> {requirements.leads.number} leads</h1>
          {requirements.leads.complete && (<FaCheckCircle className='text-green-600'/>)}
        </div>
        <div className={`p-4 rounded-lg flex items-center justify-between  ${requirements.Colaborations.complete ? 'bg-green-400' : 'bg-gray-200'}`}>
          <h1> {requirements.Colaborations.number} collaborations</h1>
          {requirements.Colaborations.complete && (<FaCheckCircle className='text-green-600'/>)}
        </div>
    </div>
  </div>

    {/* User Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
        <FollowersFormPage initialData={PersonalDev}  />
        <PostsFormPage initialData={PersonalDev}  />
        <LeadsFormPage initialData={PersonalDev}  />
        <CollaborationsFormPage initialData={PersonalDev}  />
        
    </div>

    {/* Chatbot Link */}
    <div className="px-4 my-8">
        <Link href="/personal/chatbot">
         <Card
         className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
         >
           <div className="flex items-center gap-x-4">
            <div className='p-2 w-fit rounded-md bg-orange-300 '>
              <MessageSquare className="w-8 h-8 text-orange-600"/>
            </div>
            <div className="font-semibold">
              Personal Branding chatbot
            </div>
           </div>
           <ArrowBigRight className="w-5 h-5"/>
         </Card>
        </Link>
    </div>
    </div>
    )
    }
    </div>
  );
};

export default ProfilePage;
