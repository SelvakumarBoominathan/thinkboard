import mongoose from "mongoose";

const URI = process.env.URI;
console.log("Loaded URI:", process.env.URI ? "✅ found" : "❌ missing");

export const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected successfully!");
  } catch (err) {
    console.log("Database connection error: ", err);
  }
};
