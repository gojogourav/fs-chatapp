import Link from "next/link";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { OrganizationSwitcher } from "@clerk/nextjs";
export default function Topbar() {
    return (
        

        <nav className="top-0 fixed items-center flex w-full text-xl  bg-black p-4 z-50 justify-center">
           <Link href="/" className="flex items-center gap-4">
            <Image src="vercel.svg" alt="logo" width={26} height={26}/>
            <p className=" font-extrabold text-white max-xs:hidden text-2xl">Threads</p>

            <div className=" flex items-center gap-1 text-white ">
                    <SignedIn>
                        <SignOutButton>
                                <Image 
                                src="vercel.svg"
                                alt="logo"
                                width={24}
                                height={24}
                                />
                        </SignOutButton>
                    </SignedIn>

            </div>
           </Link>
        </nav>
    );
}