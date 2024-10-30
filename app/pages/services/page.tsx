"use client";

import { useState } from "react";
import {
  FaMapMarkedAlt,
  FaSuitcase,
  FaUsers,
  FaGift,
  FaCalendarAlt,
  FaRobot,
  FaGlobe,
  FaTags,
} from "react-icons/fa"; // Icons for services

const servicesData = [
  {
    id: 1,
    title: "Personalized Trip Planning",
    description: "Create customized travel itineraries based on your preferences with ease.",
    icon: FaMapMarkedAlt,
  },
  {
    id: 2,
    title: "Offline Maps & AR Guides",
    description: "Access offline maps and augmented reality guides to explore confidently.",
    icon: FaSuitcase,
  },
  {
    id: 3,
    title: "Group Travel Tools",
    description: "Easily plan group trips with shared itineraries and collaborative tools.",
    icon: FaUsers,
  },
  {
    id: 4,
    title: "Exclusive Offers & Packages",
    description: "Take advantage of special deals and packages tailored for you.",
    icon: FaGift,
  },
  {
    id: 5,
    title: "Endless New Destinations",
    description: "Discover new destinations added regularly by our global travel community.",
    icon: FaGlobe,
  },
  {
    id: 6,
    title: "Adventure Scheduling Made Easy",
    description: "Plan adventures and activities in advance with our easy scheduling tools.",
    icon: FaCalendarAlt,
  },
  {
    id: 7,
    title: "Live Pricing, Real-Time Updates",
    description: "Get live updates on prices and availability for flights and accommodations.",
    icon: FaTags,
  },
  {
    id: 8,
    title: "AI-Driven Travel Recommendations",
    description: "Receive personalized travel suggestions with our AI recommendation engine.",
    icon: FaRobot,
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setActiveService(id === activeService ? null : id); // Toggle active state
  };

  const handleOutsideClick = () => {
    setActiveService(null); // Reset when clicking outside
  };

  return (
    <div
      className="relative flexCenter min-h-screen bg-cover bg-center bg-fixed py-12 px-6"
      style={{ backgroundImage: "url('/service.jpg')" }} // Replace with correct image path
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Click Outside to Close */}
      <div className="absolute inset-0 z-0" onClick={handleOutsideClick}></div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-6xl space-y-12">
        <h1 className="text-5xl font-bold mb-6 animate-fadeIn">Our Services</h1>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => handleCardClick(service.id)}
                className={`relative bg-white/20 p-8 rounded-3xl shadow-lg backdrop-blur-lg cursor-pointer transition-all ${
                  activeService === service.id ? "scale-105" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <Icon className="text-6xl mb-4 text-white" />
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  {activeService === service.id ? (
                    <p className="text-lg mt-4">{service.description}</p>
                  ) : (
                    <p className="text-sm text-gray-200 mt-2">Click for more info</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
