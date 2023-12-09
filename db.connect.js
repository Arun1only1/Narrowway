import mongoose from "mongoose";

const password = encodeURIComponent("arun2nly2");

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://arun:${password}@school.b6qkdnb.mongodb.net/narrowway?retryWrites=true&w=majority`
    );
    console.log("DB connection established");
  } catch (error) {
    console.log(error.message);
    console.log("DB connection failed.");
  }
};
