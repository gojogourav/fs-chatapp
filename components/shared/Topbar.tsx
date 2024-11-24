import Link from "next/link";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { OrganizationSwitcher } from "@clerk/nextjs";
export default function Topbar() {
    return (
        

        <nav className="top-0 fixed items-center flex w-full justify-between  bg-black bg-opacity-25 p-4 z-50">
           <Link href="/" className="flex items-center gap-4">
            <Image src="vercel.svg" alt="logo" width={26} height={26}/>
            <p className="text-xl font-extrabold text-white max-xs:hidden">Threads</p>

            <div className=" flex items-center gap-1 text-white">
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className=" flex cursor-pointer">
                                <Image 
                                src="vercel.svg"
                                alt="logo"
                                width={24}
                                height={24}
                                />
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher
                    appearance={{
                        elements:{
                            organizationSwitcherTrigger:"px-2 py-2"
                        }
                    }}
                />
            </div>
           </Link>
        </nav>
    );
}