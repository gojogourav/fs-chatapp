import Link from "next/link.js"
import Image from "next/image"
import {sidebarLinks} from "../../constants/index.js"
export default function LeftSidebar(){
    return(
        <section className="">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link)=>(
                    <Link href={link.route}
                    key={link.label}
                    className=""
                    >
                        <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={24}
                        height={24}
                        />
                        <p className=" text-white max-lg:hidden">{link.label }

                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

