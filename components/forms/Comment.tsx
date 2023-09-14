"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation, ThreadValidation } from '@/lib/validations/user';
import * as z from "zod";
import { Input } from '../ui/input';
import { usePathname, useRouter } from 'next/navigation';
import { postComment } from '@/lib/actions/thread.actions';
import Image from 'next/image';

interface Props {
    threadId: string,
    currentUserImage: string,
    currentUserId: string
}


const Comment = ({threadId , currentUserImage, currentUserId}:Props) => {


    
  const pathname = usePathname();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
     thread: '',
    }
  });

  const onSubmit = async(values: z.infer<typeof CommentValidation>) => {
    await postComment(threadId, values.thread, JSON.parse(currentUserId), pathname)

    form.reset()

    router.push(`/`)
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
      <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex items-center gap-3 w-full'>
              <FormLabel>
                <Image 
                src={currentUserImage}
                alt='loading Image'
                height={50}
                width={50}
                className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                type='text'
                placeholder='Comment'
                className='account-form_input no-focus'
                {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn'>Reply</Button>
        </form>
        </Form>
  )
}

export default Comment