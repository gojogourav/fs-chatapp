"use client"

import { ThreadValidation } from "@/lib/validations/threads.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { z } from "zod";

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
import { createThread } from "@/lib/actions/thread.actions";
import { usePathname } from "next/navigation";

export default function PostThread({ user }: { user: any }) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      userId: user.id,
    },
  });

  const onSubmit = async (values:z.infer<typeof ThreadValidation>)=>{
    await createThread({
        text:values.thread,
        author:user,
        communityId:null,
        path:pathname
    })

    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-white border border-white">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Write here ..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-white">Submit</Button>
      </form>
    </Form>
  );
}
