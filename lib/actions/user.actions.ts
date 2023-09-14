"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { ConnectDatabase } from "../mongoose"
import Thread from "../models/thread.models";
import { FilterQuery, SortOrder } from "mongoose";

  
interface Params {
    userId: string, username: string, name: string, bio: string, image: string, path: string
}

export const updateUser = async({userId,
                                 username,
                                 name,
                                 bio,
                                 image,
                                 path}:Params) => {

    ConnectDatabase();

    try {
        await User.findOneAndUpdate(
            {id: userId},
            {username: username.toLowerCase(),
            name,
            bio,
            image,
            onboarded:true,
        },
        {upsert:true}
            );
    
            if(path==='/profile/edit'){
                revalidatePath(path)
            }
    } catch (error: any) {
        throw new Error(`Failed to create/update User ${error.message}`)
    }


}


export const getUser = async (userId: string) => {

    try {
        ConnectDatabase();

        return await User.findOne({id:userId})
        // .populate({
        //     path:'communities',
        //     model:Community
        // })
    } catch (error:any) {
        throw new Error(`failed to getUser ${error.message}`)
    }

   
}



export const getUserPosts =async (userId: string) => {
    try {
        ConnectDatabase();



        //populate community

        const threads = await User.findOne({id: userId}).populate({
            path: 'threads',
            model: Thread,
            populate: {
                path: 'children',
                model: Thread,
                populate: {
                    path: 'author',
                    model: User,
                    select: 'name image id'
                }
            }
        })

            return threads;


    } catch (error: any) {
        throw new Error(`Error in : ${error.message}`)
    }
}



export const getAllUsers =async ({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20 ,
    sortBy = 'desc',
}:{
    userId: string,
    searchString: string,
    pageNumber: number,
    pageSize: number,
    sortBy: SortOrder,
}) => {
    try {
        ConnectDatabase();

        const skipAmount = (pageNumber - 1)*pageSize;

        const regex = new RegExp(searchString , "i");

        const query: FilterQuery<typeof User> = {
            id: {$ne: userId}
        }

        if(searchString.trim() !== '') {
            query.$or = [
                {username: {$regex: regex}},
                {name: {$regex: regex}}
            ]
        }

        const sortOptions = {createdAt: sortBy};

        const usersQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize);

        const totalUsersCount = await User.countDocuments(query)

        const users = await usersQuery.exec()

        const isNext = totalUsersCount > skipAmount + users.length;

        return{users, isNext}

    } catch (error: any) {
        throw new Error (`Error in : ${error.message}`)
    }
}



export const getActivity =async (userId: string) => {
    try {
        ConnectDatabase();

        const userThreads = await Thread.find({author: userId})

        //collect all chld comments

        const childThreadId = userThreads.reduce((acc, userThreads)=> {
            return acc.concat(userThreads.children)
        }, [])

        const replies = await Thread.find({
            _id: {$in: childThreadId},
            author: {$ne: userId}
        }).populate({
            path: 'author',
            model: User,
            select: 'name image _id'
        })

        return replies;

    } catch (error: any) {
        throw new Error (`Error in: ${error.message}`)
    }
}