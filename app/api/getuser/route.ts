import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Your existing MongoDB connection
import mongoose from 'mongoose';
import User from '@/models/user'; // Import the User model

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId'); // Get userId from query parameters

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid User ID format' }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase(); // Ensures the connection is established
    const user = await User.findById(userId); // Use the Mongoose model to find the user by ID

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, name: user.name });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching user data:', errorMessage);
    return NextResponse.json({ error: 'Failed to fetch user data', details: errorMessage }, { status: 500 });
  }
}
