
import React from 'react'
import { SignOutButton } from '@clerk/nextjs'
import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs/server'

console.log('Onboarding page loaded successfully');


async function page() {
  const user = await currentUser();

  const userInfo = {
    
      id: user?.id||" ",
      objectId: user?.id||" ",
      username: user?.username||"Guest",
      name: user?.firstName+" "+user?.lastName || " ",
      bio: typeof user?.publicMetadata?.bio === "string" ? user?.publicMetadata?.bio : "Write your bio here...",
      image: user?.imageUrl||"",

  }

  const userData = {
    id:user?.id,
    objectId:userInfo?.id,
    username: userInfo?.username,
    name:userInfo.name,
    bio:userInfo?.bio,
    image:userInfo?.image
  }

  return (
    <div className='mx-auto max-w-3xl flex-col justify-center px-10 py-20 text-black'>
      <h1>OnBoarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now to use Threads
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile
        user={userData}
        btnTitle="hello"
        
        />
      </section>
      
    </div>
  )
}

export default page