"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook

const destinations = [
  {
    name: "Bali, Indonesia",
    description: "Experience the magical beaches and rich culture of Bali.",
    image: "/bali.jpg",
  },
  {
    name: "Santorini, Greece",
    description: "Enjoy the stunning sunsets and whitewashed architecture.",
    image: "/santorini.jpg",
  },
  {
    name: "Kyoto, Japan",
    description: "Discover the beauty of temples and cherry blossoms.",
    image: "/kyoto.jpg",
  },
  {
    name: "Banff, Canada",
    description: "Explore the breathtaking views of the Canadian Rockies.",
    image: "/banff.jpg",
  },
];

const GetApp = () => {
  const router = useRouter(); // Initialize router

  const handleSignUpClick = () => {
    router.push("/login"); // Navigate to the login page
  };

  return (
    <section className="get-app bg-gradient-to-br from-green-400 to-blue-500 py-12 px-6 text-white">
      <div className="max-container mx-auto text-center">
        <h2 className="bold-40 lg:bold-64 mb-6">Explore Beautiful Destinations</h2>
        <p className="regular-20 mb-12">
          Join us to discover amazing places across the globe. Your next adventure awaits!
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flexCenter flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="bold-20">{destination.name}</h3>
                <p className="regular-16 mt-2">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sign Up Now Button */}
        <button
          onClick={handleSignUpClick} // Handle button click
          className="btn_green mt-10 px-10 py-4 text-lg rounded-full"
        >
          Sign Up Now
        </button>
      </div>
    </section>
  );
};

export default GetApp;
