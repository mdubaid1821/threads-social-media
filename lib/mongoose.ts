import mongoose from "mongoose"


export const ConnectDatabase = async()=> {
    await mongoose.connect(process.env.DB_URI, {dbName:"threads"}).then(()=>{console.log(`Database is connected`)}).catch((error)=>{console.log(`${error}`)})
}