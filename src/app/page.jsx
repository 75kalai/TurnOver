"use client";
import React, { useEffect, useState, useContext } from 'react'
import Card from '@/components/card/card'
import Register from './(guest)/@register/page'
import Interests from './(session)/@interests/page';
import { UserContext } from './layout';

export default function App() {

  const {userData, setUserData} = useContext(UserContext)

  // const isLoggedIn=false;
  const [isLoggedIn, setIsLoggedIn] = useState( "" )

  useEffect(()=>{
    // setIsLoggedIn( cookieUtil.getUserDetails().email ? true : false );
  })

  return (
    <div className='app'>
      <Card>
        { userData?.name ? <Interests/> : <Register/> }
      </Card>
    </div>
  )
}
