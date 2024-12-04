import { mongodb } from "@/lib/mongodb";
import User from "@/app/models/Users";

// Named export for POST requests
export const POST = async (req) => {
    try {
        // Connect to MongoDB
        await mongodb();

        // Parse the request body
        const { name, email, password } = await req.json();

        // Validate input fields
        if (!name || !email || !password) {
            return new Response(
                JSON.stringify({ error: "All fields are required" }),
                { status: 400 }
            );
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "User already exists" }),
                { status: 400 }
            );
        }

        // Create the new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Return success response
        return new Response(
            JSON.stringify({ message: "User created successfully" }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in user registration:", error);

        // Return server error response
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
};
