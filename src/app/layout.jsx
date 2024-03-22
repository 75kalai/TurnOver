"use client"
import "./globalStyle.css"
import Header from "./@header/page"
import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

export const UserContext = createContext()

export default function RootLayout({ children }) {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // todo : if token is present, get user data and init context
    const token = Cookies.get('token')
    if (token) {
      (async () => { //IIFE
        const response = await fetch("/api/user", {
          headers: {
            authorization:`Bearer ${token}`
          }
        })
        const json = await response.json()
        setUserData({
          name: json.data.name,
          email: json.data.email
        })
      }
      )()
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <title>75kalai@gmail.com - TurnOver Assignment </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>

        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          {children}
        </UserContext.Provider>

      </body>
    </html>
  )
}
