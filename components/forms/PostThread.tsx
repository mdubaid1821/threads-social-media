"use client";

import React from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreadValidation } from '@/lib/validations/user';
import * as z from "zod";
import { Textarea } from '../ui/textarea';
import { usePathname, useRouter } from 'next/navigation';
import { CreateThread } from '@/lib/actions/thread.actions';

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  },
  btnTitle: string;
}





const PostThread = ({userId}:{userId: string}) => {

  const pathname = usePathname();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
     thread: '',
     accountId: userId
    }
  });

  const onSubmit = async(values: z.infer<typeof ThreadValidation>) => {
    await CreateThread({
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathname,

    });

    router.push("/")
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
      <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex items-center gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2 mr-16'>
                Content
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea
                rows={15}
                className='account-form_input no-focus'
                {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500'>Post Thread</Button>
        </form>
        </Form>

  )
}

export default PostThread