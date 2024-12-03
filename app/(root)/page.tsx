// import LeftSidebar from "@/components/shared/LeftSidebar";

import { fetchPosts } from "@/lib/actions/thread.actions";


export default async function Home() {
  const result = await fetchPosts(1,30);
  
  console.log(result);
  
  return (
   <> 
      <div className="mt-40 ml-20 font-extrabold text-2xl text-white ">
        {result.posts.map(post=>
          <div key={post._id} className="p-5 border border-white" >
            <div className="text-purple-500 font-normal text-lg top-0">
              {post.author.username}
            </div>

            <div className="mt-10 bg-zinc-800 p-10">
            {post.text}

            </div>
          </div>
        )}
      </div>

   </>
   
  );
}
