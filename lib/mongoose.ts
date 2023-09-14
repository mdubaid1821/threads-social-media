import mongoose from "mongoose";


export const ConnectDatabase = async () => {
    const dbUri = process.env.DB_URI;
  
    if (!dbUri) {
      console.error("DB_URI environment variable is not defined.");
      return;
    }
  
    try {
      await mongoose.connect(dbUri, { dbName: "threads" });
      console.log("Database is connected");
    } catch (error) {
      console.error(`${error}`);
    }
  };
  