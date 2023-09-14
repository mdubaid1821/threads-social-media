import ThreadCard from '@/components/cards/ThreadCard'
import Comment from '@/components/forms/Comment';
import { getThreadId } from '@/lib/actions/thread.actions';
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({params}:{params:{id: string}}) => {

    if(!params.id) return null;

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await getUser(user.id)

    if(!userInfo?.onboarded) redirect('/onboarding');

    const thread = await getThreadId(params.id)


  return (
    <section className="relative">
        <div>
        <ThreadCard
          key = {thread._id}
          id = {thread._id}
          currentUserId = {user?.id || ''}
          parentId = {thread.parentId}
          content = {thread.text}
          author = {thread.author}
          community = {thread.community}
          createdAt = {thread.createdAt}
          comments = {thread.children}
          />
        </div>

        <div className="mt-9 text-light-1">
            <Comment 
            threadId = {thread._id}
            currentUserImage = {userInfo.image}
            currentUserId = {JSON.stringify(userInfo._id)}
            />
        </div>

        <div className='mt-10 text-light-1'>
          {
            thread.children.map((childItem: any)=>(
              <ThreadCard
          key = {childItem._id}
          id = {childItem._id}
          currentUserId = {user?.id || ''}
          parentId = {childItem.parentId}
          content = {childItem.text}
          author = {childItem.author}
          community = {childItem.community}
          createdAt = {childItem.createdAt}
          comments = {childItem.children}
          isComment
          />
            ))
          }
        </div>
    </section>
  )
}

export default page