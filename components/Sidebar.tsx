"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHome, FaUser, FaPlane, FaHotel, FaClipboardList, FaBrain, FaGlobe } from "react-icons/fa";

const navLinks = [
  { label: "Home", href: "/pages/dashboard", icon: <FaHome /> },
  { label: "Profile", href: "/pages/dashboard/profile", icon: <FaUser /> },
  { label: "Search Flights", href: "/pages/dashboard/search-flights", icon: <FaPlane /> },
  { label: "Search Hotels", href: "/pages/dashboard/search-hotels", icon: <FaHotel /> },
  { label: "Itinerary", href: "/pages/dashboard/itinerary", icon: <FaClipboardList /> },
  { label: "Plan a Trip with our AI Buddy", href: "/pages/dashboard/ai-buddy", icon: <FaBrain /> },
  { label: "Research New Places", href: "/pages/discover", icon: <FaGlobe /> },
];

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("/pages/dashboard");

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-gray-200 to-gray-400 p-6 shadow-lg flex flex-col justify-between">
      {/* Navigation Links */}
      <nav className="space-y-6">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            <div
              onClick={() => setActiveLink(link.href)}
              className={`flex items-center gap-4 p-4 rounded-lg transition-colors duration-300 hover:bg-gray-300 ${
                activeLink === link.href ? "bg-gray-300 text-green-900" : "text-gray-800"
              }`}
            >
              <span className="text-xl text-green-600">{link.icon}</span>
              <span>{link.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="text-center text-gray-500">
        <p className="text-sm">2024 © PathfinderX</p>
      </div>
    </aside>
  );
}
