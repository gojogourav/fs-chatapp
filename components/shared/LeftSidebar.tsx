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
    <section className=''>
        <div className='mt-20 font-bold text-xl w-48  rounded rounded-xl'>
            {sidebarLinks.map((link)=>{
                const isActive = (pathname.includes(link.route) && link.route.length>1 )||pathname === link.route  

               return( 
               
               <Link href={link.route} key={link.label} className={`flex p-2  m-2 gap-2 ${isActive && 'bg-purple-500'}`}
                
               >
                    <Image
                        src={link.imgURL}
                        alt={link.label}
                        height={24}
                        width={24}
                    />
                    <p className='text-white'>{link.label}</p>
                </Link>)
})}
                <SignedIn>
                        <SignOutButton>

                        </SignOutButton>
                    </SignedIn>
        </div>
    </section>

  )
}

export default LeftSidebar