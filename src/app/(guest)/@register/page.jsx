import React from 'react'
import Link from 'next/link'
import "./registerStyle.css"

export default function Register() {
     return (
          <div className='register'>
               <p className="title">Create your account</p>
               <div className="input-container">
                    <label>Name</label>
                    <input type="text" name="name" placeholder='Enter'/>
               </div>
               <div className="input-container">
                    <label>Email</label>
                    <input type="text" name="email" placeholder='Enter'/>
               </div>
               <div className="input-container">
                    <label >Password</label>
                    <input type="text" name="password" placeholder='Enter'/>
               </div>
               <div className="btn create-account-btn">CREATE ACCOUNT</div>
               <p className='has-account'>
                    Have an Account? <Link href="/login" className="link">LOGIN</Link>
               </p>
          </div>
     )
}
