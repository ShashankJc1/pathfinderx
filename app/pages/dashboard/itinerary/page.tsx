"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";

// Define the Itinerary type
interface Itinerary {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
}

export default function ItineraryPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Collapse form

  const handleCreateItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for creating a new itinerary
  };

  return (
    <DashboardLayout>
      <div
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        } p-6 lg:px-20 transition-all duration-500 ease-in-out`}
      >
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${
              darkMode ? "bg-indigo-600" : "bg-gray-300"
            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out shadow-lg`}
          >
            <span className="sr-only">Toggle Dark Mode</span>
            <span
              className={`${
                darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200`}
            />
          </Switch>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-wide mb-2 text-gray-800 dark:text-gray-200 animate-fadeIn">
            Your Itinerary
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Create, manage, and share your travel plans in style.
          </p>
        </div>

        {/* Collapsible Form Section */}
        <div className="mb-10">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex justify-between items-center w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold">Create a New Itinerary</h2>
            <span
              className={`${
                collapsed ? "rotate-180" : "rotate-0"
              } transform transition-transform duration-300`}
            >
              {collapsed ? "▲" : "▼"}
            </span>
          </button>
          {!collapsed && (
            <form
              onSubmit={handleCreateItinerary}
              className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-6 transition-all"
            >
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Trip Name
                </label>
                <input
                  type="text"
                  placeholder="Enter trip name"
                  className="w-full p-4 bg-gray-200 dark:bg-gray-700 rounded-lg focus:bg-white focus:ring-4 focus:ring-green-400 dark:focus:bg-gray-800 dark:text-white transition-all"
                />
              </div>
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full p-4 bg-gray-200 dark:bg-gray-700 rounded-lg focus:bg-white focus:ring-4 focus:ring-green-400 dark:focus:bg-gray-800 dark:text-white transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-4 bg-gray-200 dark:bg-gray-700 rounded-lg focus:bg-white focus:ring-4 focus:ring-green-400 dark:focus:bg-gray-800 dark:text-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-4 bg-gray-200 dark:bg-gray-700 rounded-lg focus:bg-white focus:ring-4 focus:ring-green-400 dark:focus:bg-gray-800 dark:text-white transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-lg hover:bg-teal-500 hover:shadow-lg transition-all duration-300"
              >
                Create Itinerary
              </button>
            </form>
          )}
        </div>

        {/* Itinerary List Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Your Itineraries
          </h2>
          {itineraries.length === 0 ? (
            <p className="text-lg text-gray-500 dark:text-gray-400">
              You have no itineraries yet. Start by creating one above!
            </p>
          ) : (
            <ul className="space-y-6">
              {itineraries.map((itinerary, index) => (
                <li
                  key={index}
                  className={`bg-${
                    darkMode ? "gray-800" : "white"
                  } p-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 flex justify-between items-center`}
                >
                  <div>
                    <h3 className="text-2xl font-semibold">{itinerary.name}</h3>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                      {itinerary.destination} | {itinerary.startDate} -{" "}
                      {itinerary.endDate}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                      Delete
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                      Share
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* AI Planning Assistance */}
        <div className="bg-gradient-to-r from-green-500 to-teal-400 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-4">Plan Your Trip with Our AI Buddy</h2>
          <p className="text-lg mb-4">
            Need help planning? Use our AI-powered trip planner for personalized suggestions.
          </p>
          <Link href="/pages/dashboard/ai-buddy">
            <button className="px-6 py-3 bg-white text-green-500 rounded-lg hover:bg-gray-200 transition-all">
              Plan with AI Buddy
            </button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
