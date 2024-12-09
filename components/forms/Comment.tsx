"use client"
import { CommentValidation, ThreadValidation } from "@/lib/validations/threads.validations";
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
import { usePathname, useRouter } from "next/navigation";
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions";
import mongoose from "mongoose";


interface Params {
  threadId: string;
  currentUserImg: string;
  currentUserId: object;
}


function Comment({ threadId, currentUserId, currentUserImg }: Params) {
    const path = usePathname()
    const form =  useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
          thread: "",
        },
      });

      

      const onSubmit = async (values:z.infer<typeof CommentValidation>)=>{
        await addCommentToThread(
           threadId,
           values.thread,
           currentUserId,
           path
        );
        console.log('FORM SUBMITTED');
        
        form.reset()
        
    
      }
  
    return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  border border-zinc-600 rounded-2xl  w-full mt-0  text-black"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem>
                
                <FormControl>
                  <textarea
                    className="p-7 select-none text-base h-auto w-full mb-0 bg-zinc-800 text-white"
                    placeholder="Write here ..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-purple-600 font-bold flex-col content-center text-xl  top-0 mt-0 p-5 w-full "
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Comment;
