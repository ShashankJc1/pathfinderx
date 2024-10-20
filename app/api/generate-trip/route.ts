import { NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';

// Set up the Google Cloud Vertex AI environment
const PROJECT_ID = 'propane-ripsaw-439005-e6';
const LOCATION = 'us-east1';
const MODEL = 'gemini-1.5-flash-001';

// Initialize VertexAI
const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });

export async function POST(req: Request) {
  try {
    const { travelType, peopleCount, countryPreference, days } = await req.json();

    // Construct the prompt for Vertex AI
    const prompt = `Plan a trip for ${peopleCount} people interested in ${travelType} travel, with a preference for ${countryPreference}. The trip should last for ${days} days.`;

    // Initialize the model
    const generativeModel = vertexAI.getGenerativeModel({
      model: MODEL,
    });

    // Generate the trip recommendation
    const response = await generativeModel.generateContent(prompt);

    // Extract the first candidate's content text
    const candidates = response?.response?.candidates;
    if (candidates && candidates.length > 0) {
      const recommendation = candidates[0].content?.parts?.map(part => part.text).join(" ");

      return NextResponse.json({ success: true, recommendation });
    } else {
      return NextResponse.json({ success: false, error: 'No recommendation generated. Please try again.' });
    }
  } catch (error) {
    console.error('Error generating trip:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate trip recommendation' });
  }
}
