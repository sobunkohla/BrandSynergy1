import { db } from "@/lib";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params } : { params: { marketspaceId : string, brandingId : string}}
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
              

            const brandingStrategy = await db.brandingStrategy.update({
              where : {
                id : params.brandingId,
                marketSpaceId: params.marketspaceId,
            },
                data: {
                   ...values 
                },
            })
             
             return NextResponse.json(brandingStrategy)

        } catch (err) {
            console.log("[MARKETSPACES]", err);
            return new NextResponse("Internal Error", { status : 500})
        }
     }

     export async function DELETE(
        req: Request,
        { params }: { params: { marketspaceId: string, brandingId : string } }
      ) {
        try {
          const { userId } = auth();
      
          if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
          }
      
          const marketspace = await db.marketSpace.findUnique({
            where: {
              id: params.marketspaceId,
              userId: userId,
            }
          });
      
          if (!marketspace) {
            return new NextResponse("Not found", { status: 404 });
          }
      
         
          const brandingStrategy = await db.brandingStrategy.findUnique({
            where: {
              id: params.brandingId,
              marketSpaceId:params.marketspaceId
              
            }
          });
      
          if (!brandingStrategy) {
            return new NextResponse("Not found", { status: 404 });
          }
          const deletedBrandingStrategy = await db.brandingStrategy.delete({
            where: {
                id: params.brandingId,
                marketSpaceId: params.marketspaceId
            },
          });
      
          return NextResponse.json(deletedBrandingStrategy);
        } catch (error) {
          console.log("[COURSE_ID_DELETE]", error);
          return new NextResponse("Internal Error", { status: 500 });
        }
      }
      