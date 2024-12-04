import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic"; // Enable dynamic rendering

// MongoDB connection setup
let client;
let db;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI); // Replace with your MongoDB URI
    await client.connect();
    db = client.db(); // Use the database specified in the URI or provide a database name here
  }
}

// GET handler for fetching the `feedback` collection
export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Access the "feedback" collection
    const feedbackCollection = db.collection("users");

    // Optional: Handle filters or query parameters
    const url = new URL(request.url, `http://${request.headers.get("host")}`);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const query = queryParams.filter ? JSON.parse(queryParams.filter) : {};

    // Fetch all feedback documents
    const feedbackData = await feedbackCollection.find(query).toArray();

    // Map MongoDB's `_id` to `id` for consistency
    const formattedFeedback = feedbackData.map((item) => ({
      id: item._id.toString(),
      ...item,
    }));

    // Return the fetched data as JSON
    return new Response(JSON.stringify({ data: formattedFeedback }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
