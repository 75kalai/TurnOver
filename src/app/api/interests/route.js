import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { headers } from 'next/headers'
import responseUtil from "@/helpers/responseUtil";
import jwt from 'jsonwebtoken'


export async function GET(request) {

     try {
          const headersInstance = headers()
          const authHeader = headersInstance.get('authorization')
          const token = authHeader.split(' ')[1]

          const decoded = jwt.verify(token, process.env.JWT_SECRET)

          if (!decoded) {
               return new Response(responseUtil.constructFailureJson("Bad User token"))
          }

          //------- verified token --------

          const searchParams = request.nextUrl.searchParams
          
          const pageNum = parseInt(searchParams.get('page'))
          const pageNumber = (isNaN(pageNum)) || (typeof pageNum != "number") || (pageNum < 1) ? 1 : pageNum
          
          let pageSize = parseInt(searchParams.get("size")) 
          pageSize = (isNaN(pageSize)) || (typeof pageSize != "number") || (pageSize < 1) ? 6 : pageSize
          
          const recordsToSkip = (pageNumber - 1) * pageSize;

          const recordsForPage = await prisma.categories.findMany({
               take: pageSize, 
               skip: recordsToSkip
          });

          const usersInterests = (await prisma.users.findFirst({
               where:{
                    email:decoded.email
               },
               select:{
                    interests:true
               }
          }) ).interests;

          recordsForPage.forEach( ( record )=>{
               if( usersInterests.includes(record.category_id) ){
                    record.isSelected=true
               }else{
                    record.isSelected=false
               }
          } )

          const categoriesRowCount = await prisma.categories.count()
          const remainingRows = categoriesRowCount - (pageSize*pageNumber)

          return NextResponse.json(responseUtil.constructSuccessJson("data fetched", { list:recordsForPage, totalRows:categoriesRowCount, remainingRows:remainingRows}));
     } catch (error) {
          console.log('error', error);
          return NextResponse.json(responseUtil.constructFailureJson("User Token-verification / Autherization failed", { error }))
     }
}
