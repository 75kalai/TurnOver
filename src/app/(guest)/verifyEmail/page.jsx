import React from 'react'
import "./verifyEmailStyle.css"
import Card from '@/components/card/card'

export default function Login() {
     return (
          <Card>
               <div className='verify-email'>
                    <p className="title">Verify your email</p>
                    <div className="description">
                         <div className="p-1">Enter the 8 digit code you have received on </div>
                         <div className="p-2">anu***@gmail.com</div>
                    </div>
                    <div className="input-container">
                         <label>Code</label>
                         <div className='codes'>
                              <input type="text" className="code" maxlength="1" />
                              <input type="text" className="code" maxlength="1" />
                              <input type="text" className="code" maxlength="1" />
                              <input type="text" className="code" maxlength="1" />
                              <input type="text" className="code" maxlength="1" />
                              <input type="text" className="code" maxlength="1" />
                              <input type="text" className="code" maxlength="1" />
                              <input type="text" className="code" maxlength="1" />
                         </div>
                    </div>
                    <div className="btn create-account-btn">LOGIN</div>

               </div>
          </Card>
     )
}
