import { NextResponse } from "next/server";

// Function to get location ID from the city name
async function getLocationId(cityName: string) {
  const tripAdvisorApiKey = process.env.TRIPADVISOR_API_KEY;

  if (!tripAdvisorApiKey) {
    throw new Error("Tripadvisor API key is missing");
  }

  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=${encodeURIComponent(cityName)}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': tripAdvisorApiKey,
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();

    console.log("Location data:", JSON.stringify(data, null, 2)); // Log for debugging

    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      return data.data[0].locationId;
    } else {
      console.log(`No location ID found for the city name: "${cityName}".`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching location ID:", error);
    return null;
  }
}

// Define and export the POST method for this API route
export async function POST(req: Request) {
  const body = await req.json();
  const { location, checkInDate, checkOutDate } = body;

  const tripAdvisorApiKey = process.env.TRIPADVISOR_API_KEY;

  // Check if the API key exists
  if (!tripAdvisorApiKey) {
    return NextResponse.json({ success: false, error: "Tripadvisor API key is missing" });
  }

  // Get location ID from city name
  const locationId = await getLocationId(location);

  if (!locationId) {
    return NextResponse.json({
      success: false,
      error: `Invalid location: "${location}". Please enter a valid city name.`,
    });
  }

  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?locationId=${locationId}&checkIn=${checkInDate}&checkOut=${checkOutDate}&rooms=1&adults=1&currency=USD`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': tripAdvisorApiKey,
      'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();

    if (data && data.data && data.data.length > 0) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, error: "No hotels found for the selected destination." });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: errorMessage });
  }
}
