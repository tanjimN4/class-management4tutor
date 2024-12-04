const mongoose = require("mongoose");

export const mongodb = async () => {
  try {
    // Use Mongoose to connect to the MongoDB database
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    return mongoose.connection; // Return the Mongoose connection instance
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Failed to connect to the database.");
  }
};
