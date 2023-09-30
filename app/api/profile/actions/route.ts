import { db } from "@/lib";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function DELETE(
    req: Request,
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const personalDev = await db.personalDev.findUnique({
        where: {
        
          userId: userId,
        }
      });
  
      if (!personalDev) {
        return new NextResponse("Not found", { status: 404 });
      }
  
     
  
      const deletePersonalDev = await db.personalDev.delete({
        where: {
          userId,
        },
      });
  
      return NextResponse.json(deletePersonalDev);
    } catch (error) {
      console.log("[COURSE_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  


export async function PATCH (
    req: Request,
) {
    try {
      const { userId } = auth();
    const values = await req.json();
      if (!userId) { 
        return new NextResponse('Unauthorized', {status : 401})
      }
const personalDev = await db.personalDev.update({
     where : {         
        userId : userId
    },

    data : {
        ...values,
    }
})

return NextResponse.json(personalDev)
    } catch (err) { 
        console.log('[MARKETSPACE_ID', err)
        return new NextResponse('Internal Error' , { status: 500 })
    }
}