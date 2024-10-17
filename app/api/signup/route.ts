import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

// Handle POST requests for user signup
export async function POST(request: Request) {
  // Connect to the MongoDB database
  await connectToDatabase();

  try {
    // Extract name, email, and password from request body
    const { name, email, password } = await request.json();
    
    // Hash the user's password before storing it
    const hashedPassword = await hash(password, 10);

    // Create a new user document with hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Respond with a success message
    return NextResponse.json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Failed to signup" }, { status: 500 });
  }
}
