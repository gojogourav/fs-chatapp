"use client";
import React from "react";
import Link from "next/link.js";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation.js";
import { SignOutButton } from "@clerk/nextjs";
import { OrganizationSwitcher, SignedIn, useClerk } from "@clerk/clerk-react";

function LeftSidebar() {
  const pathname = usePathname();
  const user = useClerk().user?.username || "Anon";
  const route = useRouter();

  const sidebarLinks = [
    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: `Welcome ${user}`,
    },

    {
      imgURL: "/assets/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/assets/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/assets/heart.svg",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "/assets/create.svg",
      route: "/create-thread",
      label: "Create Thread",
    },
    {
      imgURL: "/assets/community.svg",
      route: "/communities",
      label: "Communities",
    },
    {
      imgURL: "/assets/user.svg",
      route: "/profile",
      label: "Profile",
    },
  ];

  return (
    <div className="mt-20 font-bold text-xl w-60  rounded-xl rounded-l-none  bg-zinc-900 p-3 h-auto hidden sm:block  ">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`mt-5 flex p-4 m-2 gap-2 rounded-xl ${
              isActive && "bg-purple-500"
            }`}
          >
            <Image src={link.imgURL} alt={link.label} height={24} width={24} />
            <p className="text-white ">{link.label}</p>
          </Link>
        );
      })}
      <OrganizationSwitcher
        appearance={{
          elements: {
            organizationSwitcherTrigger: "mt-5 flex p-4 m-2 gap-2 rounded-xl  text-2xl",
          },
        }}
      />

        <SignedIn >
          <SignOutButton>
            <div className={`mt-5 flex p-4 m-2 gap-2 rounded-xl text-white cursor-pointer`}>
              <Image
                src="/assets/logout.svg"
                alt="logout"
                height={24}
                width={24}
              />
              <p>Sign Out</p>
            </div>
          </SignOutButton>
        </SignedIn>

        
      </div>
  );
}

export default LeftSidebar;
