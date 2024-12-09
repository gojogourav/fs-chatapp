
import { ThreadCard } from "@/components/cards/Thread-fetchpost.home";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
const Page = async ({ params }: { params: { id: string } }) => {
  const {id } = await params
  if (!id ) {
    console.error("Error no params provided");

    return null;
  }

  try{
      const clerkUser = await currentUser();
      const userid = clerkUser?.id
      const user = await User.findOne({userid:userid})
      console.log("THIS IS USER IN THREAD",user);
      
      if (!user) {
        console.error("Error user not found");
        console.log(user);
        
        return null;
      }
    
      const thread = await fetchThreadById(id);
      if (!thread) {
        console.error("Error thread not loaded");
    
        return null;
      }
      console.log(thread);
    
      return (
        <section className="mt-40 ml-20 font-extrabold text-2xl text-white ">
          <div>
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUserId={user?._id}
              parentId={thread.parentId}
              content={thread.text}
              author={thread.author}
              community={thread.community}
              createedAt={thread.createedAt}
              comments={thread.children}
            />
          </div>
    
          <div>
            <Comment
              threadId={thread.id}
              currentUserImg={user.imageUrl}
              currentUserId={user.id}
            />
          </div>
        </section>
      );
  }catch(error:any){
    console.error("Error fetching thread or user data:", error.message);
    return null;

  }

};
export default Page;
