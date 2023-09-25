import { db } from "@/lib";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
     )  {
        try {
            const { userId } = auth();
            const { businessName } =  await req.json();
            
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }

            const marketspace = await db.marketSpace.create({
                data: {
                    userId,
                    businessName,
                    
                },
            })

            return NextResponse.json(marketspace);

        } catch (err) {
            console.log("[MARKETSPACES]", err);
            return new NextResponse("Internal Error", { status : 500})
        }
     }