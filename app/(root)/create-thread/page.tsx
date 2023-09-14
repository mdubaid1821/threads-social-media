import PostThread from '@/components/forms/PostThread';
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {

  console.log(currentUser())
  const user = await currentUser();

  if(!user) return 'user not found';

  const userInfo = await getUser(user.id)

  if(!userInfo?.onboarded) redirect('/onboarding')




  return (

    <>
    <h1 className="head-text">Create Thread</h1>

    <PostThread userId={userInfo._id}/>
    </>
  )
}

export default page;