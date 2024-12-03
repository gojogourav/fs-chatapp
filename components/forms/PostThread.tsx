"use client"
import { ThreadValidation } from "@/lib/validations/threads.validations";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/router";
import * as  z  from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.actions";
import mongoose from "mongoose";
// import { usePathname } from "next/navigation";




export default function PostThread( {user}:{user :string}) {
  const router = useRouter()
  if(!user){
    console.log(`user doesn't exist`);
    
  }

  console.log(`Userid is ${user}`);
  console.log(`THIS IS USEFORM ${useForm}`);
  

  // const router = useRouter();
  // const pathname = usePathname();

  const form =  useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      userId: user || "", // 
    },
  });

  const onSubmit = async (values:z.infer<typeof ThreadValidation>)=>{
    console.log(user);
    
    await createThread({
        text:values.thread,
        author:user,
        communityId:null,
        path:null,
        parentId:null,
    })

    router.push("/")
  }

  return (

    <div className=" w-11/12 h-11/12">

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  border border-zinc-600 rounded-2xl  w-11/12 h-max text-black">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="text-white text-lg text-center font-bold m-5">
                Create Threads

                </div>
                
              </FormLabel>
              <FormControl >
                <textarea className="p-7 h-auto w-full bg-zinc-800 text-white" placeholder="Write here ..." {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-purple-600 font-bold flex-col content-center text-xl ml-5 mb-5  p-5 ">Submit</Button>
      </form>
    </Form>
    </div>
  );
}
