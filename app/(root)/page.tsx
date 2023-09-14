

import ThreadCard from '@/components/cards/ThreadCard';
import { getPosts } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

const page = async() => {

  const result = await getPosts(1,30)

  const user  = await currentUser();





  return (
   <>

<section className='mt-9 flex flex-col gap-10'>
  {
    result.posts.length === 0 ? (
      <p className=' no-result text-light-1'>No Posts</p>
    ): (
      <>
      {
        result.posts.map((item)=>(
          <ThreadCard
          key = {item._id}
          id = {item._id}
          currentUserId = {user?.id || ''}
          parentId = {item.parentId}
          content = {item.text}
          author = {item.author}
          community = {item.community}
          createdAt = {item.createdAt}
          comments = {item.children}
          />
         
        ))
      }
      </>
    )
  }
</section>
   </>
  )
}

export default page