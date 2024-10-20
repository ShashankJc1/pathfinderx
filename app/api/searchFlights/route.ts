import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

// Define and export the POST method for this API route
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { departure, destination, departureDate, returnDate } = body;

  // Define options using the SkyScanner API request parameters
  const options = {
    method: 'POST',
    hostname: 'sky-scanner3.p.rapidapi.com',
    port: null,
    path: '/flights/search-multi-city',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Securely store API key
      'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const reqApi = https.request(options, (resApi) => {
      const chunks: Buffer[] = [];

      resApi.on('data', (chunk) => {
        chunks.push(chunk);
      });

      resApi.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        try {
          const parsedBody = JSON.parse(body);
          resolve(NextResponse.json(parsedBody)); // Send flight data back to the client
        } catch (error) {
          reject(NextResponse.json({ message: 'Error parsing response', error }, { status: 500 }));
        }
      });
    });

    reqApi.on('error', (error) => {
      reject(NextResponse.json({ message: error.message }, { status: 500 }));
    });

    // Write request body with actual search parameters from the user form
    reqApi.write(
      JSON.stringify({
        market: 'US',
        locale: 'en-US',
        currency: 'USD',
        adults: 1,
        children: 0,
        infants: 0,
        cabinClass: 'economy',
        stops: ['direct', '1stop', '2stops'],
        sort: 'cheapest_first',
        flights: [
          {
            fromEntityId: departure, // Departure IATA code from the user form
            toEntityId: destination, // Destination IATA code from the user form
            departDate: departureDate,
          },
          returnDate
            ? {
                fromEntityId: destination,
                toEntityId: departure,
                departDate: returnDate,
              }
            : {},
        ],
      })
    );

    reqApi.end(); // End the API request
  });
}
