import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
var validator = require("email-validator");
import responseUtil from "@/helpers/responseUtil"


export async function POST(request) {
     const credentials = await request.json()

     if (!credentials.email || !credentials.password || !credentials.name) {
          return NextResponse.json( responseUtil.constructFailureJson("Missing Email or Password or Name") )
     }

     if (validator.validate(credentials.email)) {

          const user = await prisma.users.findUnique({
               where: {
                    email: credentials.email
               }
          })
          if (user) {
               return NextResponse.json( responseUtil.constructFailureJson("User already exists") )
          } else {

               let createdUser = await prisma.users.create({
                    data: {
                         name: credentials.name,
                         email: credentials.email,
                         password: credentials.password
                    }
               })

               return NextResponse.json(responseUtil.constructSuccessJson("User registered successfully")) // SUCCESS
          }

     } else {
          return NextResponse.json( responseUtil.constructFailureJson("Email is invalid") )
     }

}