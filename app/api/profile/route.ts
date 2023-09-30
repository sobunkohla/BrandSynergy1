import { db } from "@/lib";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
     )  {
        try {
            const { userId } = auth();
            const  values  =  await req.json();
            
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }

            const personalDev = await db.personalDev.create({
                data: {
                  userId,
                   ...values
                    
                },
            })

            return NextResponse.json(personalDev);

        } catch (err) {
            console.log("[MARKETSPACES]", err);
            return new NextResponse("Internal Error", { status : 500})
        }
     }
