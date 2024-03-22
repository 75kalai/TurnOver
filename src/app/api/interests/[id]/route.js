import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { headers } from 'next/headers'
import responseUtil from "@/helpers/responseUtil";
import jwt from 'jsonwebtoken'

export async function PUT(request, {params}) {

     try {
          const headersInstance = headers()
          const authHeader = headersInstance.get('authorization')
          const token = authHeader.split(' ')[1]

          const decoded = jwt.verify(token, process.env.JWT_SECRET)

          if (!decoded) {
               return new Response(responseUtil.constructFailureJson("Bad User token"))
          }

          //------- verified token --------

          const category_id = parseInt( params.id)
          const body = await request.json()
          const setSelected = body.setSelected
          
          let result=null;

          if(setSelected){
               // add to arr
               result = await prisma.users.update({
                    where:{
                         email:decoded.email
                    },
                    data:{
                         interests:{
                              push: category_id
                         }
                    }
               })
          }else{
               // remove from arr
               const interests = (await prisma.users.findUnique({
                    where:{
                         email:decoded.email
                    },
                    select:{
                         interests:true
                    }
               }) ).interests;

               result = await prisma.users.update({
                    where:{
                         email:decoded.email
                    },
                    data:{
                         interests:{
                              set: interests.filter( (cid)=>cid!=category_id )
                         }
                    }
               })
          }
          return NextResponse.json(responseUtil.constructSuccessJson("updated interest", result));

     } catch (error) {
          console.log('error', error);
          return NextResponse.json(responseUtil.constructFailureJson("An error occured", { error }))
     }
}
