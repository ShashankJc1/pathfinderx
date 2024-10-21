"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { FaPlane, FaClipboardList, FaMap } from "react-icons/fa";

export default function DashboardPage() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const userId = "670ed8a34b4b2ce71e7222b1"; // Replace with the actual _id of the logged-in user

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/getuser?userId=${userId}`);
        const data = await response.json();

        if (data.success) {
          setName(data.name); // Update state with the fetched name
        } else {
          console.error(data.error || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 lg:px-20">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-teal-400 to-blue-500 p-6 rounded-lg shadow-md text-white">
          <h2 className="bold-40">Welcome, {name || 'Guest'}!</h2>
          <p className="regular-20">Here’s a summary of your recent activity.</p>
        </div>

        {/* Quick Actions Section */}
        <div className="flex gap-4">
          <Link href="/pages/dashboard/search-flights">
            <button className="btn_interactive flex items-center gap-2">
              <FaPlane className="text-xl" />
              Search Flights
            </button>
          </Link>
          <Link href="/pages/dashboard/view-itinerary">
            <button className="btn_interactive flex items-center gap-2">
              <FaClipboardList className="text-xl" />
              View Itinerary
            </button>
          </Link>
          <Link href="/pages/dashboard/ai-buddy">
            <button className="btn_interactive flex items-center gap-2">
              <FaMap className="text-xl" />
              Plan a Trip
            </button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
