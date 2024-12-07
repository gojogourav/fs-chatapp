import { ThreadCard } from "@/components/cards/Thread-fetchpost.home";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs/server";
const Page = async ({ params }: { params: { id: string } }) => {
  if (!params?.id) {
    console.log("Error no params provided");

    return null;
  }
  const user = await currentUser();
  if (!user) {
    console.log("Error user not found");

    return null;
  }

  const thread = await fetchThreadById(await params.id);
  if (!thread) {
    console.log("Error thread not loaded");

    return null;
  }
  console.log(thread);

  return (
    <section className="mt-40 ml-20 font-extrabold text-2xl text-white rounded-4xl">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createedAt={thread.createedAt}
          comments={thread.children}
        />
      </div>
    </section>
  );
};
export default Page;
