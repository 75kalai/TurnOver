import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
var validator = require("email-validator");
import responseUtil from "@/helpers/responseUtil"
import jwt from 'jsonwebtoken'

export async function POST(request) {
     const credentials = await request.json()

     if (!credentials.email || !credentials.password) {
          return NextResponse.json(responseUtil.constructFailureJson("Missing Email or Password"))
     }

     if (validator.validate(credentials.email)) {

          const user = await prisma.users.findUnique({
               where: {
                    email: credentials.email
               }
          })
          if (user) {
               if (user.password == credentials.password) {
                    const token = jwt.sign({ name:user.name, email:user.email }, process.env.JWT_SECRET)
                    return NextResponse.json(responseUtil.constructSuccessJson("User is Authenticated", {token, email:user.email, name:user.name})) // SUCCESS
               } else {
                    return NextResponse.json(responseUtil.constructFailureJson("Incorrect password"))
               }
          } else {
               return NextResponse.json(responseUtil.constructFailureJson(`User with email ${credentials.email} is not found`))
          }

     } else {
          return NextResponse.json(responseUtil.constructFailureJson("Email is invalid"))
     }

}