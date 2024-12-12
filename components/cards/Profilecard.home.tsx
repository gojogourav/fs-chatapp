// "use client"
import Image from "next/image";
import { fetchUserComments, fetchUserThreads } from "@/lib/actions/thread.actions";
import { ThreadCard } from "./Thread-fetchpost.home";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
interface Params {
  accountId: object;
  authUserId: string;
  name: string;
  username: string;
  ImageUrl: string;
  bio: string | null;
}

export const ProfileHeader = async ({
  accountId,
  authUserId,
  name,
  username,
  ImageUrl,
  bio,
}: Params) => {

  
  
  let threads = await fetchUserThreads({
      pageSize: 20,
      pageNumber: 1,
      userid: accountId,
    })

  return (
    <div className="text-white text-xl">
      <div>
        <Image
          src={ImageUrl}
          alt="Profile Image"
          height={100}
          width={100}
          className="rounded-full"
        />
      </div>
      <div className="flex mt-5 mb-5 gap-2 content-center items-center">
        <h1 className="font-bold  text-2xl flex text-white">
          {name.split(" ")[0]}
        </h1>
        <h1 className="align-middle  text-base flex items-center text-gray-400">
          @{username}
        </h1>
      </div>
      <section className="text-base ">{bio}</section>
      <div className="text-lg mt-8 ">
        <a   className="cursor-pointer bg-zinc-800 p-3 rounded-xl hover:bg-zinc-700">
          Posts
        </a>
        <a className="cursor-pointer bg-zinc-800 p-3 rounded-xl hover:bg-zinc-700 mx-5">
          Comments
        </a>
        <button className="cursor-pointer bg-zinc-800 p-3 rounded-xl hover:bg-zinc-700 ">
          Mentions
        </button>
      </div>

      <article id="thread-container"></article>


        {threads.post.map((thread) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={thread?.id}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createedAt={thread.createedAt}
            comments={thread.children}
          />
        ))}
      
    </div>
  );
}
