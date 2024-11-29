import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions';
import PostThread from '@/components/forms/PostThread';


export default async function Page() {
  const user = await currentUser();
  if(!user) return null;
  console.log(user.id);
  

  const userInfo = await fetchUser(user.id)
  if(!userInfo?.onboard) redirect('/onboarding');



  return (
    <div className='mt-40 ml-20 font-extrabold text-2xl text-white'>
      <PostThread user={user}/>
    </div>
  )
}
