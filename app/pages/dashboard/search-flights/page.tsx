"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout"; // Assuming you have this layout component

// Define the Place interface
interface Place {
  PlaceId: string;
  PlaceName: string;
}

// Define the Leg interface for flight legs
interface Leg {
  id: string;
  origin: {
    name: string;
    displayCode: string;
    city: string;
    country: string;
  };
  destination: {
    name: string;
    displayCode: string;
    city: string;
    country: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  stopCount: number;
  carriers: {
    marketing: { name: string; logoUrl: string }[];
  };
}

// Define the Itinerary interface for flight itineraries
interface Itinerary {
  id: string;
  price: {
    formatted: string;
  };
  legs: Leg[];
}

export default function SearchFlightsPage() {
  const [roundTrip, setRoundTrip] = useState(true);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightResults, setFlightResults] = useState<Itinerary[]>([]);
  const [airportSuggestions, setAirportSuggestions] = useState<Place[]>([]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]); // To track filter by stops

  // Fetch flight results from backend API
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/searchFlights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        departure,
        destination,
        departureDate,
        returnDate: roundTrip ? returnDate : null,
      }),
    });

    const data = await response.json();
    setFlightResults(data.data.itineraries || []); // Store flight itineraries in state
  };

  // Fetch airport suggestions from SkyScanner Auto-Suggest API
  const fetchAirportSuggestions = async (query: string) => {
    if (!query) return;

    const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

    if (!apiKey) {
      console.error("API Key is missing");
      return;
    }

    const response = await fetch(
      `https://sky-scanner3.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${query}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
        } as HeadersInit,
      }
    );

    const data = await response.json();
    setAirportSuggestions(data.Places || []); // Store airport suggestions
  };

  // Handle Stops Filter
  const handleStopChange = (stop: string) => {
    setSelectedStops((prevStops) => 
      prevStops.includes(stop)
        ? prevStops.filter((s) => s !== stop) // Remove the stop if already selected
        : [...prevStops, stop] // Add the stop if not selected
    );
  };

  // Apply the stops filter to the flight results
  const filteredFlightResults = flightResults.filter((itinerary) => {
    if (selectedStops.length === 0) return true; // No filters selected, show all
    return itinerary.legs.some((leg) => selectedStops.includes(`${leg.stopCount} stops`));
  });

  // Helper function to format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <DashboardLayout> {/* Properly opened */}
      {/* Search Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Departure Input */}
            <div className="flex flex-col">
              <label className="block text-lg font-medium text-gray-700">Departure</label>
              <input
                type="text"
                placeholder="Enter departure city"
                value={departure}
                onChange={(e) => {
                  setDeparture(e.target.value);
                  fetchAirportSuggestions(e.target.value);
                }}
                className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400"
              />
            </div>

            {/* Destination Input */}
            <div className="flex flex-col">
              <label className="block text-lg font-medium text-gray-700">Destination</label>
              <input
                type="text"
                placeholder="Enter destination city"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  fetchAirportSuggestions(e.target.value);
                }}
                className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400"
              />
            </div>

            {/* Departure Date */}
            <div className="flex flex-col">
              <label className="block text-lg font-medium text-gray-700">Departure Date</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400"
              />
            </div>

            {/* Return Date */}
            {roundTrip && (
              <div className="flex flex-col">
                <label className="block text-lg font-medium text-gray-700">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400"
                />
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow hover:from-teal-500 hover:to-green-500 transition-all"
            >
              Search Flights
            </button>
          </div>
        </form>
      </div>

      {/* Filter Sidebar */}
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-4">Filters</h3>

          {/* Stops */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Stops</label>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedStops.includes("0 stops")}
                  onChange={() => handleStopChange("0 stops")}
                  className="mr-2"
                /> 
                Direct
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedStops.includes("1 stops")}
                  onChange={() => handleStopChange("1 stops")}
                  className="mr-2"
                /> 
                1 Stop
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedStops.includes("2 stops")}
                  onChange={() => handleStopChange("2 stops")}
                  className="mr-2"
                /> 
                2+ Stops
              </label>
            </div>
          </div>
        </aside>

        {/* Flight Results Section */}
        <div className="w-full md:w-3/4">
          <div className="grid gap-6">
            {filteredFlightResults.length > 0 ? (
              filteredFlightResults.map((itinerary) => (
                <div key={itinerary.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-green-500">
                      Price: {itinerary.price.formatted}
                    </h3>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all">
                      Select
                    </button>
                  </div>

                  {itinerary.legs.map((leg) => (
                    <div key={leg.id} className="mb-4 border-b border-gray-200 pb-4">
                      <h4 className="text-lg font-medium text-gray-700">
                        {leg.origin.city} ({leg.origin.displayCode}) → {leg.destination.city} (
                        {leg.destination.displayCode})
                      </h4>
                      <p>Departure: {new Date(leg.departure).toLocaleString()}</p>
                      <p>Arrival: {new Date(leg.arrival).toLocaleString()}</p>
                      <p>Duration: {formatDuration(leg.durationInMinutes)}</p>
                      <p>Stops: {leg.stopCount}</p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-500">Enter your details and hit "Search" to find flights.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Properly closed
