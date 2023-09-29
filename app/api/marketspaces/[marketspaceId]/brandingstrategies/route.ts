import { db } from "@/lib";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    {params } : { params: { marketspaceId : string}}
     )  {
        try {
            const { userId } = auth();
            const { title } =  await req.json();
            
            if (!userId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
 
           
            const marketSpaceOwner = await db.marketSpace.findUnique({
                where: {
                    userId,
                    id: params.marketspaceId,
                    
                },
            })

            if (!marketSpaceOwner) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
              

            const brandingStrategy = await db.brandingStrategy.create({
                data: {
                    title,
                    marketSpaceId: params.marketspaceId,
                },
            })
    
             return NextResponse.json(brandingStrategy)

        } catch (err) {
            console.log("[MARKETSPACES]", err);
            return new NextResponse("Internal Error", { status : 500})
        }
     }