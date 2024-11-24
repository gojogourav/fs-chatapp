"use client"

import { sidebarLinks } from "@/constants/index";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default  function Bottombar(){
    const pathname = usePathname();
    const route = useRouter();
    return(
        <section className=" ">
            <div className=" md:hidden lg:hidden absolute inset-x-0 bottom-0 h-16 flex justify-around px-6 bg-zinc-900">
        {sidebarLinks.map((link)=>{
            const isActive = (pathname.includes(link.route)&& link.route.length>1)||pathname===link.route

            return(
                <Link href={link.route} key={link.label} className={`w-10 h-10 pt-3 m-3 items-center content-center ${isActive && 'bg-purple-500'}`}>
                    <Image 
                        src={link.imgURL}
                        alt={link.label}
                        height={24}
                        width={24}
                    />
                </Link>
            )
        })}


            </div>
        </section>
    )
}
