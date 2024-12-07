import Link from "next/link";
import Image from "next/image";
interface Props {
  key: string;
  id: string;
  currentUserId?: string;
  parentId: string|null;
  content: string;
  author: {name:string;
            image:string;
            id:string
  };
  community: {
    id:string;
    name:string;
    image:string
  }|null
  createedAt: string;
  comments: {
    author:{
        image:string;

    }[]
  };
}

export const ThreadCard = ({
  key,
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createedAt,
  comments,
}: Props) => {
  return(
    <article className="flex w-full flex-col rounded border border-zinc-600  my-10 p-5 text-base">
        <div className="">
            <div className="flex gap-2 items-center mb-4 text-lg">
                <div className="   ">
                    <Link href={`/profile/${author.id}`} className="relative h-8 w-8 flex">
                        <Image
                        
                            src={author.image}
                            alt="profile image"
                            fill
                            className="curosr-pointer rounded-full flex"
                        />
                    </Link>
                </div>
                <div className="text-purple-400 font-sans">
                    <Link href={`/profile/${author.id}`} >
                        <h4>{author.name.split(" ")[0]}</h4>
                    </Link>
                </div>
        
            </div>
        </div>
        <div className="text-base ml-10 ">

        {content}
        </div>
                <div className=" mt-7 flex flex-row justify-start gap-5 ml-10">
                    <div className=" flex gap-3.5">
                        <Image src="/assets/heart-gray.svg" alt="heart igon" width={24} height={24} className="cursor-pointer object-contain"/>
                    </div>
                    <Link href={`/thread/${id}`}>
                        <Image src="/assets/reply.svg" alt="comment" width={24} height={24} className="cursor-pointer object-contain"/>
                    </Link>
                    <div className=" flex gap-3.5">
                        <Image src="/assets/repost.svg" alt="repost" width={24} height={24} className="cursor-pointer object-contain"/>
                    </div>
                    <div className=" flex gap-3.5">
                        <Image src="/assets/share.svg" alt="share" width={24} height={24} className="cursor-pointer object-contain"/>
                    </div>
                </div>
    </article>

  );
};
