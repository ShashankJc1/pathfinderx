
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

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
