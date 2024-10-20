"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AIBuddyPage() {
  const [travelType, setTravelType] = useState<string>("adventure");
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [countryPreference, setCountryPreference] = useState<string>("");
  const [days, setDays] = useState<number>(7);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to generate trip recommendation
  const handleGenerateTrip = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/planTrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          travelType,
          peopleCount,
          countryPreference,
          days,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setRecommendation(data.recommendation);
      } else {
        setError(data.error || "Failed to generate trip recommendation.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:px-20">
        {/* Header Section */}
        <h1 className="text-4xl font-bold mb-6">Plan a Trip with our AI Buddy</h1>
        <p className="text-lg text-gray-500 mb-6">
          Let our AI buddy help you plan your perfect trip! Fill in the details below, and get personalized recommendations.
        </p>

        {/* Trip Planning Form */}
        <form onSubmit={handleGenerateTrip} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Travel Type Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Travel Type</label>
            <input
              type="text"
              value={travelType}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTravelType(e.target.value)}
              placeholder="e.g., adventure, cultural, family"
              className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400 w-full"
            />
          </div>

          {/* Number of People Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Number of People</label>
            <input
              type="number"
              value={peopleCount}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPeopleCount(Number(e.target.value))}
              className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400 w-full"
            />
          </div>

          {/* Country Preference Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Country Preference (Optional)</label>
            <input
              type="text"
              value={countryPreference}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCountryPreference(e.target.value)}
              placeholder="e.g., Japan, France, none"
              className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400 w-full"
            />
          </div>

          {/* Number of Days Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Number of Days</label>
            <input
              type="number"
              value={days}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDays(Number(e.target.value))}
              className="p-3 bg-white rounded-lg shadow-sm border-gray-300 focus:ring-4 focus:ring-green-400 w-full"
            />
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition-all w-full"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Trip"}
            </button>
          </div>
        </form>

        {/* Recommendation Result */}
        {recommendation && (
          <div className="mt-10 bg-green-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Trip Recommendation</h2>
            <p className="text-lg text-gray-800">{recommendation}</p>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-lg mt-6">{error}</p>}
      </div>
    </DashboardLayout>
  );
}
