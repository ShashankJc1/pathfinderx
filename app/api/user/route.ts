import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user"; // Your User model

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id);

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
