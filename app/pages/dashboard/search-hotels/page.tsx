"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

// Define the Hotel interface
interface Hotel {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
}

export default function SearchHotelsPage() {
  const [city, setCity] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch hotels from the API
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/searchLocations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: city,
          checkInDate,
          checkOutDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const hotelData = data.data || [];

        if (hotelData.length === 0) {
          setError("No hotels found for the given city. Please try a different city.");
        } else {
          const mappedHotels = hotelData.map((hotel: any) => ({
            id: hotel.hotelId,
            name: hotel.name,
            price: hotel.price,
            rating: hotel.rating,
            image: hotel.image,
          }));
          setHotels(mappedHotels);
        }
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while fetching hotel data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:px-20">
        {/* Search Section */}
        <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Search Hotels</h2>
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City Input */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400"
              />
            </div>

            {/* Check-in Date Input */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">Check-in Date</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400"
              />
            </div>

            {/* Check-out Date Input */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-700">Check-out Date</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400"
              />
            </div>

            {/* Search Button */}
            <div className="col-span-full text-center md:text-left mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition-all"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search Hotels"}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-lg">{error}</p>}

        {/* Hotel Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white p-6 rounded-lg shadow-lg">
                <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
                <p className="text-lg text-gray-600">Price: ${hotel.price}</p>
                <p className="text-lg text-gray-600">Rating: {hotel.rating}</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all">
                  Book Now
                </button>
              </div>
            ))
          ) : (
            !loading && <p className="text-lg text-gray-500">Enter a city name and search for hotels.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
