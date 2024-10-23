import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const { departure, destination, departureDate, returnDate } = body;

  if (!departure || !destination || !departureDate) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const options = {
    method: 'POST',
    hostname: 'sky-scanner3.p.rapidapi.com',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
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
          resolve(NextResponse.json(parsedBody));
        } catch (error) {
          resolve(NextResponse.json({ error: 'Error parsing response' }, { status: 500 }));
        }
      });
    });

    reqApi.on('error', (error) => {
      reject(NextResponse.json({ error: 'API Request Failed' }, { status: 500 }));
    });

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
        ].filter(Boolean),
      })
    );

    reqApi.end();
  });
}
