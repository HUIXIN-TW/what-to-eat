import mongoose from "mongoose";

let isConnected = false; // store connection status

export const connectToDatabase = async () => {
  mongoose.set("strickQuery", "true");

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connet(process.env.MONOGO_URI, {
      dbName: "what-to-eat",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
  }
};
