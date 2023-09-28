import { db } from "@/lib";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params } : { params: { marketspaceId : string, businessId : string}}
     )  {
        try {
            const { userId } = auth();
            const  values  =  await req.json();
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
              

            const businessStrategy = await db.businessStrategy.update({
              where : {
                id : params.businessId,
                marketSpaceId: params.marketspaceId,
            },
                data: {
                   ...values 
                },
            })
             
             return NextResponse.json(businessStrategy)

        } catch (err) {
            console.log("[MARKETSPACES]", err);
            return new NextResponse("Internal Error", { status : 500})
        }
     }