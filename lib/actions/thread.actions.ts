"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";
import User from "../models/user.model";
import { ConnectDatabase } from "../mongoose"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}

export const CreateThread =async ({text, author, communityId, path}:Params) => {
    
    try {
        ConnectDatabase()

        const CreateThread = await Thread.create({
            text,
            author,
            community:null,
        });

        //update user model
        await User.findByIdAndUpdate(author, {
            $push: {threads: CreateThread._id}
        })

        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error is: ${error.message}`)
    }


}



export const getPosts =async (pageNumber = 1, pageSize = 20) => {
    try {
        ConnectDatabase();

        //calculate the number of posts to skip

        const skipPosts = (pageNumber - 1)* pageSize;

        //posts that have no parents (top-level threads)
        const postsQuery = Thread.find({parentId: {$in: [null, undefined]}})
        .sort({createdAt: 'desc'})
        .skip(skipPosts)
        .limit(pageSize)
        .populate({path: 'author' , model: User})
        .populate({
            path: 'children',
            populate:{
                path:'author',
                model: User,
                select: '_id name parentId image'
            }
        })

        const totalPostCount = await Thread.countDocuments({parentId: {$in: [null, undefined]}})

        const posts = await postsQuery.exec()

        const isNext = totalPostCount > skipPosts + posts.length;

        return {posts , isNext}

    } catch (error: any) {
        throw new Error (`Error in : ${error.message}`)
    }
}


export const getThreadId = async (id:string) => {
    try {
        ConnectDatabase();

        //ToDo - populate community
        const thread = await Thread.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: '_id id name image'
        })
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: '_id id name parentId image'
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image'
                    }
                }
            ]
        }).exec();

        return thread;
    } catch (error: any) {
        throw new Error (`Error in : ${error.message}`)
    }
}


export const postComment = async (threadId: string, commentText: string, userId: string, path: string) => {
    try {
        ConnectDatabase();

        const originalThread = await Thread.findById(threadId);

        if(!originalThread) {
            throw new Error(`Thread not found`)
        }

        const comment = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        })

       const savedComment =  await comment.save()

        await originalThread.children.push(savedComment._id)

        await originalThread.save()

        revalidatePath(path);
    } catch (error:any) {
        throw new Error(`Error in :${error.message}`)
    }
}