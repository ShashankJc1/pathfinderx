import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";

// Handle GET requests to fetch user information
export async function GET(request: Request) {
  try {
    // Extract the JWT token from the Authorization header
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify the JWT token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    
    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Respond with user data
    return NextResponse.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

