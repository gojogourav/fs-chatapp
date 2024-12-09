import { CommentCard, ThreadCard } from "@/components/cards/Thread-fetchpost.home";
import Comment from "@/components/forms/Comment";
import { fetchComments, fetchThreadById } from "@/lib/actions/thread.actions";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { cp } from "fs";
import mongoose from "mongoose";
const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  if (!id) {
    console.error("Error no params provided");

    return null;
  }

  try {
    const clerkUser = await currentUser();
    const userid = clerkUser?.id;
    const user = await User.findOne({ userid: userid });
    console.log("THIS IS USER IN THREAD", user.username);

    if (!user) {
      console.error("Error user not found");
      console.log(user);

      return null;
    }
    const threadId = new mongoose.Types.ObjectId(id)

    const thread = await fetchThreadById(id);

    if (!thread) {
      console.error("Error thread not loaded");

      return null;
    }
    console.log(thread);
    // pageNumber = 1,pageSize = 20,threadId,
    const comments = await fetchComments({
      pageNumber: 1,
      pageSize: 30,
      threadId: threadId,
    });
    console.log(id);
    
    console.log('THE FOLLOWING IS COMMENTS');
    
    console.log(comments.posts.length)

    return (
      <section className="mt-40 ml-80 font-extrabold text-2xl text-white ">
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
        <div className=" mt-10 font-extrabold text-2xl text-white ">
          {comments.posts.length === 0 ? (
            <div>No posts available</div>
          ) : (
            <>
              {comments.posts.map((post) => (
                <CommentCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createedAt={post.createedAt}
                  comments={post.children}
                />
              ))}
            </>
          )}
        </div>
      </section>
    );
  } catch (error: any) {
    console.error("Error fetching thread or user data:", error.message);
    return null;
  }
};
export default Page;
