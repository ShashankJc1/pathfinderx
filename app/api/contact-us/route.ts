import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/models/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const { name, email, phone, inquiry, message } = await request.json();
    const newContact = new Contact({ name, email, phone, inquiry, message });
    await newContact.save();

    return NextResponse.json({ message: "Message saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
