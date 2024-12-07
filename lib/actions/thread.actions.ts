"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import Thread from "../models/thread.model";
import User from "../models/user.model";

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
      });

      return thread
  } catch (error) {
    console.log(error);
  }

}
