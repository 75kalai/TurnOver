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

          // Todo: db verification of user

          return NextResponse.json(responseUtil.constructSuccessJson("User primary details decoded/fetched",{name:decoded.name, email:decoded.email}));

     } catch (error) {
          return NextResponse.json( responseUtil.constructFailureJson("User Token-verification / Autherization failed", {error}) )
     }
}

export async function POST() {

}