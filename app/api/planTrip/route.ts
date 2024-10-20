import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

// Function to get trip recommendation from Google Gemini API
async function getTripRecommendation(travelType: string, peopleCount: number, countryPreference: string, days: number) {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  // Get the client and access token
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/propane-ripsaw-439005-e6/locations/us-central1/publishers/google/models/text-bison:predict`;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instances: [
        {
          content: `Generate a ${days}-day ${travelType} trip for ${peopleCount} people. Country preference: ${countryPreference}.`,
        },
      ],
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data && data.predictions) {
      return data.predictions[0].content;
    } else {
      throw new Error('Failed to get recommendation from Google Gemini API');
    }
  } catch (error) {
    console.error('Error fetching trip recommendation:', error);
    throw new Error('Failed to fetch trip recommendation');
  }
}

// Define and export the POST method for this API route
export async function POST(req: Request) {
  const body = await req.json();
  const { travelType, peopleCount, countryPreference, days } = body;

  try {
    const recommendation = await getTripRecommendation(travelType, peopleCount, countryPreference, days);
    return NextResponse.json({ success: true, recommendation });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage });
  }
}
