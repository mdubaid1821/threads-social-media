import * as z from "zod";

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name:z.string().min(5, {message:"Minimum 5 characters are required!"}).max(15, {message:"Name cannot exceed 15 letters"}),
    username:z.string().min(5, {message:"Minimum 5 characters are required!"}).max(15, {message:"Name cannot exceed 15 letters"}),
    bio:z.string().min(10,{message:'Atleast 10 characters is required'}).max(1000),
    

})





export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3, {message:'Minimum 3 characters are required'}),
    accountId: z.string(),
    

})





export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, {message:'Minimum 3 characters are required'}),

})