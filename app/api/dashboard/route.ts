import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const runtime = "nodejs"; // Ensure Node.js runtime

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    await connectToDatabase();
    const user = await User.findById(decoded.id).select("-password"); // Fetch user data excluding password

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
