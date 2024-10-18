import Link from "next/link";
import { useState } from "react";
import { FaHome, FaUser, FaSearch, FaPlane, FaHotel, FaClipboardList, FaBrain, FaGlobe } from "react-icons/fa"; // Removed FaSignOutAlt

const navLinks = [
  { label: "Home", href: "/dashboard", icon: <FaHome /> },
  { label: "Profile", href: "/dashboard/profile", icon: <FaUser /> },
  { label: "Search Flights", href: "/dashboard/search-flights", icon: <FaPlane /> },
  { label: "Search Hotels", href: "/dashboard/search-hotels", icon: <FaHotel /> },
  { label: "Itinerary", href: "/dashboard/itinerary", icon: <FaClipboardList /> },
  { label: "Plan a Trip with our AI Buddy", href: "/dashboard/ai-buddy", icon: <FaBrain /> },
  { label: "Research New Places", href: "/pages/discover", icon: <FaGlobe /> },
];

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("/dashboard");

  return (
    <aside className="w-64 bg-gradient-to-b from-green-500 to-blue-500 h-screen p-6 shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-10 text-center">Dashboard</h2>
      <nav className="space-y-6">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.label} legacyBehavior>
            <a
              onClick={() => setActiveLink(link.href)}
              className={`flex items-center gap-4 p-4 rounded-lg transition-colors duration-300 hover:bg-green-700 ${
                activeLink === link.href ? "bg-green-700" : ""
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
