"use client"
import React, { useEffect } from 'react'
// import cookieUtil from '@/helpers/cookieUtil'

export default function page({ children }) {

  useEffect(() => {
    // let userDetails = cookieUtil.getUserDetails()
    // if (userDetails.email){
    //   location.reload()
    // }

  }, [])

  return (
    <>
      {children}
    </>
  )
}
