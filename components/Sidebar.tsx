"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUser, FaPlane, FaHotel, FaClipboardList, FaBrain, FaGlobe, FaSignOutAlt } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/pages/dashboard", icon: <FaHome /> },
  { label: "Profile", href: "/pages/dashboard/profile", icon: <FaUser /> },
  { label: "Search Flights", href: "/pages/dashboard/search-flights", icon: <FaPlane /> },
  { label: "Search Hotels", href: "/pages/dashboard/search-hotels", icon: <FaHotel /> },
  { label: "Itinerary", href: "/pages/dashboard/itinerary", icon: <FaClipboardList /> },
  { label: "Plan a Trip with our AI Buddy", href: "/pages/dashboard/ai-buddy", icon: <FaBrain /> },
  { label: "Research New Places", href: "/pages/discover", icon: <FaGlobe /> },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();  // Get the current path

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/"; // Clear the token cookie
    router.push("/pages/login"); // Redirect to the login page
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg transition-all duration-300 z-40 ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        <div className={`${isSidebarOpen ? "block" : "hidden"} p-6`}>
          {/* Logo */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-green-400">PathfinderX</h1>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                <div
                  className={`flex items-center gap-4 p-4 rounded-lg transition-colors duration-300 hover:bg-green-500 hover:text-white ${
                    pathname === link.href ? "bg-green-600 text-white" : "text-gray-400"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
              </Link>
            ))}

            {/* Logout Button */}
            <div
              onClick={handleLogout}
              className="flex items-center gap-4 p-4 rounded-lg transition-colors duration-300 hover:bg-red-500 hover:text-white text-gray-400 cursor-pointer"
            >
              <FaSignOutAlt className="text-xl" />
              <span>Logout</span>
            </div>
          </nav>

          {/* Footer */}
          <div className="text-center text-gray-500 mt-10">
            <p className="text-sm">2024 © PathfinderX</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`text-white bg-green-600 p-3 rounded-full fixed top-4 z-50 shadow-lg focus:outline-none ${
            isSidebarOpen ? "left-72" : "left-4" // Position button further right when sidebar is open
          }`}
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Your main content */}
        <div className="p-8">
          {children}
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
