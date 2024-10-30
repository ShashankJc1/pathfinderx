import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { departure, destination, departureDate, returnDate } = body;

  // Validate request parameters
  if (!departure || !destination || !departureDate) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  // Set up HTTPS request options for SkyScanner API
  const options = {
    method: 'POST',
    hostname: 'sky-scanner3.p.rapidapi.com',
    port: null,
    path: '/flights/search-multi-city',
    headers: {
      'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,  // Using NEXT_PUBLIC_RAPIDAPI_KEY
      'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
  };

  // Return a Promise to handle async API request
  return new Promise((resolve, reject) => {
    const reqApi = https.request(options, (resApi) => {
      const chunks: Buffer[] = [];

      // Collect response data
      resApi.on('data', (chunk) => {
        chunks.push(chunk);
      });

      // Handle end of response
      resApi.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        try {
          const parsedBody = JSON.parse(body); // Parse JSON response
          resolve(NextResponse.json(parsedBody)); // Resolve with parsed response
        } catch (error) {
          resolve(NextResponse.json({ error: 'Error parsing response' }, { status: 500 }));
        }
      });
    });

    // Handle request error
    reqApi.on('error', (error) => {
      reject(NextResponse.json({ error: 'API Request Failed' }, { status: 500 }));
    });

    // Write data to request body
    reqApi.write(
      JSON.stringify({
        market: 'US',
        locale: 'en-US',
        currency: 'USD',
        adults: 1,
        children: 0,
        cabinClass: 'economy',
        flights: [
          { fromEntityId: departure, toEntityId: destination, departDate: departureDate },
          returnDate ? { fromEntityId: destination, toEntityId: departure, departDate: returnDate } : null,
        ].filter(Boolean), // Filter out null if no return flight
      })
    );

    reqApi.end(); // End the request
  });
}
