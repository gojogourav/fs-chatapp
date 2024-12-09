// import LeftSidebar from "@/components/shared/LeftSidebar";

import { ThreadCard } from "@/components/cards/Thread-fetchpost.home";
import { fetchPosts } from "@/lib/actions/thread.actions";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const result = await fetchPosts(1,30);
  const user = await currentUser();
  
  // console.log(`THIS IS THREADS PAGE TESTING ${JSON.stringify(user)}`);
  
  // console.log(typeof user?.id);

  try{
    console.log("THIS IS USER ID:", user?.id); // Debugging log
    // console.log("Type of User ID:", typeof user?.id);

    await dbConnect();
    const user2 = await User.findOne({userid: user?.id });
    // console.log("Fetched User from DB:", user2);
    console.log(user2);
  }catch(error:any){
    console.log("failed to fetch user2 ",error?.message);
  }
  
  
  return (
   <> 
      <div className=" mt-40 ml-20 font-extrabold text-2xl text-white ">
        {result.posts.length===0? (
        <div>No posts available</div>)
        :<>
          {result.posts.map((post)=>(
            <ThreadCard

              key = {post._id}
              id={post._id}
              currentUserId = {user?.id}
              parentId = {post.parentId}
              content = {post.text}
              author = {post.author}
              community = {post.community}
              createedAt = {post.createedAt}
              comments = {post.children}
            />
          ))}
        </>
}
      </div>

   </>
   
  );
}
