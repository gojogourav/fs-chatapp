"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import mongoose from "mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string | null;
  parentId: string | null;
}

//TODO:implement communities

export async function createThread({
  text,
  author,
  communityId,
  path,
  parentId,
}: Params) {
  dbConnect();

  const createThread = await Thread.create({
    text,
    author,
    community: null, //here
    parentId: null,
    path: null,
  });

  //update user model

  await User.findByIdAndUpdate(author, {
    $push: { threads: createThread._id },
  }).lean();
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    await dbConnect();

    if (pageNumber < 1 || pageSize < 1) {
      throw new Error("Invalid pagination parameters");
    }

    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery = await Thread.find({ parentId: null })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Thread.countDocuments({ parentId: null });
    const isNext = totalPostsCount > skipAmount + postsQuery.length;

    return { posts: postsQuery, isNext, totalPostsCount };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}
interface Params2 {
  pageNumber: number;
  pageSize: number;
  threadId: object;
}

export async function fetchComments({
  pageNumber = 1,
  pageSize = 20,
  threadId,
}: Params2) {
  try {
    await dbConnect();

    if (pageNumber < 1 || pageSize < 1) {
      throw new Error("Invalid pagination");
    }
    const skipAmount = (pageNumber - 1) * pageSize;
    const parentThreadId = threadId;
    console.log(parentThreadId);

    const postsQuery = await Thread.find({ parentId: parentThreadId })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });
    const totalPostsCount = await Thread.countDocuments({ parentId: threadId });
    const isNext = totalPostsCount > skipAmount + postsQuery.length;

    return { posts: postsQuery, isNext, totalPostsCount };
  } catch (error) {
    console.error("Error fetching comments", error);
    throw new Error("Failed to fetch comments");
  }
}

interface Params3 {
  pageNumber: number;
  pageSize: number;
  userid: object;
}

export async function fetchUserThreads({
  pageNumber = 1,
  pageSize = 20,
  userid,
}: Params3) {
  if (pageNumber < 1 || pageSize < 1) {
    throw new Error("Invalid pagenumber");
  }

  const skipAmount = (pageNumber - 1) * pageSize;
  try {
    await dbConnect();
    const userPosts = await Thread.find({ author: userid ,  parentId: null })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });
      // console.log(userPosts);
      // console.log(`THIS IS USERPOST = ${userPosts}`);
      
      
      return { post: userPosts };
    } catch (error) {
    console.error(error);
    throw new Error("Error fetching posts");
  }
}

export async function fetchUserComments({
  pageNumber=1,
  pageSize=20,
  userid,
}:Params3){
  const skipAmount = (pageNumber-1)*pageSize;
  try{
    await dbConnect();
    const userComments = await Thread.find({author:userid,parentId:{$ne:null}})
    .sort({createdAt:"desc"})
    .skip(skipAmount)
    .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      }).exec();

      return{post:userComments};
    
  }catch(error){
    console.error(error);
    throw new Error("Error fetching comments")
  }
}


export async function fetchThreadById(id: string) {
  await dbConnect();
  try {
    const thread = await Thread.findById(id)
      .populate({ path: "author", model: User, select: "_id id name image" })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image ",
            },
          },
        ],
        // Always run for API routes
      });

    return thread;
  } catch (error) {
    console.log(error);
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: object,
  path: string
) {
  await dbConnect();
  try {
    // console.log('ADDCOMMENTTOTHREAD');

    const orignalThread = await Thread.findById(threadId);

    if (!orignalThread) {
      throw new Error("Thread not found");
    }

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const saveCommentThread = await commentThread.save();
    orignalThread.children.push(saveCommentThread._id);
    await orignalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to thread ${error.message}`);
  }
}
