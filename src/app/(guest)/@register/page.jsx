"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import "./registerStyle.css"
import { postAPI } from "@/helpers/fetchUtil"
import { useRouter } from 'next/navigation';
// import cookieUtil from "@/helpers/cookieUtil"

export default function Register() {

     const router = useRouter()

     const [formData, setFormData] = useState({
          name: "",
          email: "",
          password: ""
     })

     const handleInputChange = e => {
          setFormData(prev => {
               return {
                    ...prev,
                    [e.target.name]: e.target.value
               }
          })
     }

     const [errMsg, setErrMsg] = useState(null);

     async function createAccount() {

          setErrMsg(null);

          const response = await postAPI("/api/register", formData)

          if (response.code == 0) {
               // redirect to email verify code page
               // cookieUtil.setCookies(formData)
               router.push("/verifyEmail")
          } else {
               setErrMsg(response.message)
          }

     }

     return (
          <div className='register'>
               <p className="title">Create your account</p>
               <div className="input-container">
                    <label>Name</label>
                    <input type="text" name="name" placeholder='Enter' onChange={handleInputChange} />
               </div>
               <div className="input-container">
                    <label>Email</label>
                    <input type="text" name="email" placeholder='Enter' onChange={handleInputChange} />
               </div>
               <div className="input-container">
                    <label >Password</label>
                    <input type="password" name="password" placeholder='Enter' onChange={handleInputChange} />
               </div>
               {errMsg && <div className="error-message"> Error : {errMsg} </div>}
               <div className="btn create-account-btn" onClick={createAccount}>CREATE ACCOUNT</div>
               <p className='has-account'>
                    Have an Account? <Link href="/login" className="link">LOGIN</Link>
               </p>
          </div>
     )
}
