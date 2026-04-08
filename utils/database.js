import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "what-to-eat",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
