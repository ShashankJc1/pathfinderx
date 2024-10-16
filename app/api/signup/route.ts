import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { name, email, password } = await request.json();
    const hashedPassword = await hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Failed to signup" }, { status: 500 });
  }
}
