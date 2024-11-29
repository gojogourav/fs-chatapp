"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import User from "../models/user.model";

interface Params {
  userId: any;
  username: string;
  name: string;
  bio: string;
  path: string;
  image: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  path,
  image,
}: Params): Promise<void> {
  try {
    dbConnect();

    await User.findOneAndUpdate(
      { userid: userId },
      {
        username: username.toLowerCase().trim(),
        name,
        bio,
        path,
        image,
        onboarded: true,
      },
      { upsert: true }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create/update user : ${error.message}`);
  }
}
