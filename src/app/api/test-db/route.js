import { mongodb } from "@/lib/mongodb"; // Adjust path based on your project structure
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await mongodb(); // Get the Mongoose connection

    // Access the native MongoDB driver via mongoose.connection.db
    const collections = await db.db.listCollections().toArray(); 

    return NextResponse.json({
      message: "Connected to MongoDB!",
      collections: collections,
    });
  } catch (error) {
    console.error("Error in MongoDB connection:", error);
    return NextResponse.json({
      message: "Failed to connect to MongoDB",
      error: error.message,
    });
  }
}