
"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "../dbConnect"
import Thread from "../models/thread.model";
import User from "../models/user.model";

interface Params{
    text:string,
    author:string,
    communityId:string|null,
    path:string|null,
    parentId:string|null,
}

//TODO:implement communities


export async function createThread({text,author,communityId,path,parentId}:Params) {
    dbConnect();

    const createThread = await Thread.create({
        text,
        author,
        community:null, //here
        parentId:null,
        path:null
    });

    //update user model

    await User.findByIdAndUpdate(author,{
        $push: {threads:createThread._id}
    }).lean()

    
}


