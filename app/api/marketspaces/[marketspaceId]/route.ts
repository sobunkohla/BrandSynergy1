import { db } from "@/lib";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE(
    req: Request,
    { params }: { params: { marketspaceId: string } }
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
  
     
  
      const deletedMarketSpace = await db.marketSpace.delete({
        where: {
          id: params.marketspaceId,
        },
      });
  
      return NextResponse.json(deletedMarketSpace);
    } catch (error) {
      console.log("[COURSE_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  


export async function PATCH (
    req: Request,
   { params }: { params : {marketspaceId : string }}
) {
    try {
      const { userId } = auth();
      const { marketspaceId } = params
    const values = await req.json();
      if (!userId) { 
        return new NextResponse('Unauthorized', {status : 401})
      }
const marketspace = await db.marketSpace.update({
     where : {
        id : params.marketspaceId,
        userId : userId
    },

    data : {
        ...values,
    }
})

return NextResponse.json(marketspace)
    } catch (err) { 
        console.log('[MARKETSPACE_ID', err)
        return new NextResponse('Internal Error' , { status: 500 })
    }
}