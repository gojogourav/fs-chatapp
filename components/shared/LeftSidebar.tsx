"use client"
import React from 'react'
import {sidebarLinks} from "../../constants/index"
import Link from 'next/link.js'
import Image from 'next/image'
import { usePathname,useRouter } from 'next/navigation.js'
import { SignOutButton } from '@clerk/nextjs'
import { SignedIn } from '@clerk/clerk-react'

function LeftSidebar() {
    const pathname = usePathname()
    const route = useRouter()
  return (
        <div className='mt-20 font-bold text-xl w-60  rounded-xl  bg-zinc-900 p-3 h-full hidden sm:block '>
            {sidebarLinks.map((link)=>{
                const isActive = (pathname.includes(link.route) && link.route.length>1 )||pathname === link.route  

               return( 
               
               <Link href={link.route} key={link.label} className={`flex p-4 m-2 gap-2 rounded-xl ${isActive && 'bg-purple-500'}`}
                
               >
                    <Image
                        src={link.imgURL}
                        alt={link.label}
                        height={24}
                        width={24}
                    />
                    <p className='text-white '>{link.label}</p>
                </Link>)
})}     <div className='m-2 p-4 w-60 flex gap-3 absolute left-0 bottom-0 border-white border rounded-xl'>

                <SignedIn>
                           
                            
                        <SignOutButton >
                            <div className='flex m-2 p-2 gap-2 cursor-pointer'>
                            <Image
                                src="/assets/logout.svg"
                                alt='logout'
                                height={24}
                                width={24}
                            />
                            <p>Sign Out</p>
                            </div>
                        </SignOutButton>
                    </SignedIn>

</div>
        </div>

  )
}

export default LeftSidebar