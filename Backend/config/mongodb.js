import mongoose from "mongoose";

const connectDB = async () => {
    const MONGOURL = process.env.MONGO_URL;
    console.log("1")
   try{
    await mongoose.connect(MONGOURL)
    console.log("Database Connected successfully.")
   }catch(error){
    console.log("Error while connecting to database.")
   }
}

export default connectDB;