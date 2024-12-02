"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect";
import User from "../models/user.model";

interface Params {
  onboard:boolean,
  userId: any;
  username: string;
  name: string;
  bio: string;
  path: string;
  image: string;
}

export async function updateUser({
  onboard,
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
        onboard,
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
    console.log(error.message);
    throw new Error(`Failed to create/update user : ${error.message}`);
  }
}


export const fetchUser = async (userId:any) => {
    try{
      await dbConnect();

      return await User.findOne({userid:userId})

    }catch(error:any){
      console.error('Error fetching usr ',error);

      throw new Error( error instanceof Error  ? "Error fetching user ":"Unknown error occured");

    }
}