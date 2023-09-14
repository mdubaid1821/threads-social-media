import AccountProfile from '@/components/forms/AccountProfile';
import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { getUser } from '@/lib/actions/user.actions';

const page = async () => {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await getUser(user.id)

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };



  return (
    <main className="mx-auto flex max-w-4xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular to-light-2">
        Complete your profile to use threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile 
        user={userData} 
        btnTitle='continue' />
      </section>
    </main>
  );
};

export default page;
