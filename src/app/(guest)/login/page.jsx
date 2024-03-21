import React from 'react'
import Link from 'next/link'
import "./loginStyle.css"
import Card from '@/components/card/card'

export default function Login() {
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
                         <input type="text" name="email" placeholder='Enter' />
                    </div>
                    <div className="input-container">
                         <label >Password</label>
                         <input type="text" name="password" placeholder='Enter' />
                    </div>
                    <div className="btn create-account-btn">LOGIN</div>
                    <hr />
                    <p className='has-account'>
                         Dont have an Account? <Link href="/" className="link">SIGN UP</Link>
                    </p>
               </div>
          </Card>
     )
}
