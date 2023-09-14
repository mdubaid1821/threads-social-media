import UserCard from '@/components/cards/UserCard';
import { getAllUsers, getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await getUser(user.id)

    if(!userInfo) redirect("/onboarding")


    //get all users

    const result = await getAllUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 20,
        sortBy: 'desc'
    })



  return (
    <section>
        <h1 className="head-text mb-10">Search</h1>

        <div className="mt-14 flex flex-col gap-9">
            {
                result.users.length === 0 ? (
                    <p className="no-result">No Users</p>
                ) : (
                    <>
                    {result.users.map((item)=>(
                        <UserCard 
                        key={item.id}
                        id = {item.id}
                        name = {item.name}
                        username = {item.username}
                        image = {item.image}
                        personType = 'User'
                        />
                    ))}
                    </>
                )
            }
        </div>
    </section>
  )
}

export default page