'use client'

import { UserButton, useUser } from "@clerk/nextjs";




export default function UserImage({ level } : {
    level: string | null
}) {
    const { isLoaded, isSignedIn, user } = useUser();
  return (
    <>
    {isLoaded && isSignedIn && (
        <div className="flex  items-center">
        <img
        src={user.imageUrl}
        alt={`${user.username}'s profile`}
        className="w-16 h-16 rounded-full mr-4"
        />
        <div>
        <h1 className="text-2xl font-semibold">{user.fullName}</h1>
        <p  className="px-4 py-2 bg-orange-500 text-white rounded-full">Level {level}</p>
        </div>
    </div>
      )}
  </>
  )
}