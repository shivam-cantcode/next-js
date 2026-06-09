import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongoose is connected successfully");
    });

    connection.on("error", (err) => {
      console.error("Mongoose connection error", err);
      isConnected = false;
    });

    connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
      isConnected = false;
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    isConnected = false;
    throw error;
  }
}
