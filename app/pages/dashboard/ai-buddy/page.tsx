"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function AIBuddyPage() {
  const [travelType, setTravelType] = useState("");
  const [peopleCount, setPeopleCount] = useState<number | "">("");
  const [countryPreference, setCountryPreference] = useState("");
  const [days, setDays] = useState<number | "">("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-trip", {
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
        setError(data.error || "Failed to fetch trip recommendation. Please try again later.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:px-20">
        <h1 className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-500 animate-fade-in">
          Plan a Trip with Our AI Buddy
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8 bg-white bg-opacity-60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105">
          <div className="relative">
            <label className="block text-lg font-medium text-gray-700">Type of Travel</label>
            <input
              type="text"
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              placeholder="e.g., adventure, relaxing"
              className="w-full p-4 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 transform hover:-translate-y-1"
            />
          </div>

          <div className="relative">
            <label className="block text-lg font-medium text-gray-700">Number of People</label>
            <input
              type="number"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value as number | "")}
              placeholder="e.g., 2"
              className="w-full p-4 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 transform hover:-translate-y-1"
            />
          </div>

          <div className="relative">
            <label className="block text-lg font-medium text-gray-700">Country Preference</label>
            <input
              type="text"
              value={countryPreference}
              onChange={(e) => setCountryPreference(e.target.value)}
              placeholder="e.g., Japan, none"
              className="w-full p-4 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 transform hover:-translate-y-1"
            />
          </div>

          <div className="relative">
            <label className="block text-lg font-medium text-gray-700">Number of Days</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value as number | "")}
              placeholder="e.g., 7"
              className="w-full p-4 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 transform hover:-translate-y-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white text-xl px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loader border-t-4 border-white"></div>
                <span className="ml-2">Generating...</span>
              </div>
            ) : (
              "Generate Trip"
            )}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {recommendation && (
          <div className="mt-8 p-6 bg-gray-100 rounded-2xl shadow-xl transform transition-all duration-500 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-teal-600 text-center">Your AI-Generated Trip Recommendation</h2>
            <pre className="text-lg text-gray-700 whitespace-pre-wrap">{recommendation}</pre>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
