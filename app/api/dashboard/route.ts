// Import necessary modules
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Secret key for JWT (retrieved from environment variables)
const JWT_SECRET = process.env.JWT_SECRET as string;

export const runtime = "nodejs"; // Ensure Node.js runtime

// Handle GET requests to fetch user dashboard data
export async function GET(request: Request) {
  try {
    // Extract token from the Authorization header
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    // Connect to the MongoDB database
    await connectToDatabase();
    
    // Fetch user data by ID, excluding the password field
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Respond with user data
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}