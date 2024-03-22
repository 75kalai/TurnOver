"use client"
import React, { useState, useContext } from 'react'
import Link from 'next/link'
import "./loginStyle.css"
import Card from '@/components/card/card'
import { postAPI } from "@/helpers/fetchUtil"
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/layout';

export default function Login() {

     const { userData, setUserData } = useContext(UserContext)
     const router = useRouter()
     const [errMsg, setErrMsg] = useState(null);
     const [formData, setFormData] = useState({
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

     async function handleLogin() {
          setErrMsg(null);
          const response = await postAPI("/api/login", formData)
          if (response.code == 0) {
               // redirect to email verify code page
               setUserData({
                    name:response.data.name,
                    email:response.data.email
               })
               document.cookie = `token=${response.data.token}; path=/`
               router.push("/")
          } else {
               setErrMsg(response.message)
          }
     }

     return (
          <Card>
               <div className='login'>
                    <p className="title">Login</p>
                    <div className="welcome-msg">
                         <div className="p-1">Welcome back to ECOMMERCE</div>
                         <div className="p-2">The next gen business marketplace</div>
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
                    <div className="btn create-account-btn" onClick={handleLogin}>LOGIN</div>
                    <hr />
                    <p className='has-account'>
                         Dont have an Account? <Link href="/" className="link">SIGN UP</Link>
                    </p>
               </div>
          </Card>
     )
}
