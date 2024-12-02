import React from 'react'
import { SignIn, SignOutButton } from '@clerk/nextjs'

function page() {
  return (
    <div className='border-black flex justify-center items-center h-screen font-sans '>
      <div>

      < SignIn  />
      </div>
    </div>
  )
}

export default page