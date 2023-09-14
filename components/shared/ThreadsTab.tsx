import { getUserPosts } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import ThreadCard from '../cards/ThreadCard'



interface Props {
    accountId: string,
    currentUserId: string,
    accountType: string
}



const ThreadsTab = async ({
    accountId,
    currentUserId,
    accountType
}:Props) => {

    let result = await getUserPosts(accountId)

    if(!result) redirect('/')


  return (
    <section className="mt-9 flex flex-col gap-10">
        {
            result.threads.map((thread: any)=>(
                <ThreadCard
          key = {thread._id}
          id = {thread._id}
          currentUserId = {currentUserId}
          parentId = {thread.parentId}
          content = {thread.text}
          author = {
            accountType === 'user' ? {
                name:result.name , image:result.image, id: result.id
            } : {
                name:thread.author.name , image:thread.author.Image, id: thread.author.id
            }
          }
          community = {thread.community}   //todo
          createdAt = {thread.createdAt}
          comments = {thread.children}
          />
            ))
        }
    </section>
  )
}

export default ThreadsTab