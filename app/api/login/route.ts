import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { compare } from "bcryptjs";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

// JWT secret key for signing tokens (retrieved from environment variables)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const runtime = "nodejs"; // Ensure it runs in Node.js

// Handle POST requests for user login
export async function POST(request: Request) {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();
    
    // Extract email and password from request body
    const { email, password } = await request.json();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Create a JWT token for the user
    const token = await new SignJWT({ email: user.email, id: user._id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(JWT_SECRET);

    // Set the token in an HTTP-only cookie and respond with success message
    const response = NextResponse.json({ message: "Login successful!", token });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
