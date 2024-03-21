import React from 'react'
import Card from '@/components/card/card'
import Register from './(guest)/@register/page'
import Interests from './(session)/@interests/page';

export default function App() {
  const isLoggedIn = true;
  return (
    <div className='app'>
      <Card>
        {isLoggedIn && <Interests />}
        {!isLoggedIn && <Register />}
      </Card>
    </div>
  )
}
