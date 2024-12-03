import React from 'react'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions';
import PostThread from '@/components/forms/PostThread';
import { currentUser } from '@clerk/nextjs/server';
export default async function Page() {
  const user =  await currentUser()
  
  if(!user) return null;
  
  

  const userInfo = await fetchUser(user.id)
  // const userID = userInfo.id;
  console.log(`THIS IS USEROBJECT ${userInfo}`);
  
  console.log(`type of user is ${typeof userInfo.userid}`);
  
  if(!userInfo?.onboard) redirect('/onboarding');

  

  return (
    <div className='w-full  mt-40 ml-20 font-extrabold text-2xl text-white '>
      <PostThread user={JSON.parse(JSON.stringify((userInfo._id)))}/>
    </div>
  )
}
