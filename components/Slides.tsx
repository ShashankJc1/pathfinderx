"use client"; // Ensure this is a client component

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const destinations = [
  { name: "Bali, Indonesia", description: "Magical beaches and culture.", image: "/bali.jpg" },
  { name: "Santorini, Greece", description: "Stunning sunsets.", image: "/santorini.jpg" },
  { name: "Kyoto, Japan", description: "Temples and blossoms.", image: "/kyoto.jpg" },
  { name: "Banff, Canada", description: "Breathtaking Rockies.", image: "/banff.jpg" },
  { name: "Paris, France", description: "Eiffel Tower & cuisine.", image: "/paris.jpeg" },
  { name: "Maui, Hawaii", description: "Lush beaches & landscapes.", image: "/maui.jpg" },
  { name: "Cairo, Egypt", description: "Explore ancient pyramids.", image: "/cairo.jpg" },
  { name: "Rome, Italy", description: "Discover Roman history.", image: "/rome.webp" },
  { name: "New York, USA", description: "The city that never sleeps.", image: "/newyork.jpeg" },
  { name: "Sydney, Australia", description: "Opera House & Harbor.", image: "/sydney.jpg" },
];

const GetApp = () => {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide through destinations every 3 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setStartIndex((prevIndex) => (prevIndex + 1) % destinations.length);
      }, 3000); // Slide every 3 seconds

      return () => clearInterval(interval); // Clear the interval on component unmount
    }
  }, [isPaused]);

  // Loop to the previous slide
  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
  };

  // Loop to the next slide
  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  return (
    <section className="get-app bg-gradient-to-br from-green-400 to-blue-500 py-12 px-6 text-white">
      <div className="max-container mx-auto text-center">
        <h2 className="bold-40 lg:bold-64 mb-6">Explore Beautiful Destinations</h2>
        <p className="regular-20 mb-12">Your next adventure awaits!</p>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)} // Pause on hover
          onMouseLeave={() => setIsPaused(false)} // Resume when hover ends
        >
          <div
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${startIndex * 25}%)` }}
          >
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="w-1/4 flex-shrink-0 relative group overflow-hidden rounded-lg shadow-lg"
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

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black rounded-full p-3 shadow-md hover:bg-gray-200 transition-all"
          >
            ◀
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black rounded-full p-3 shadow-md hover:bg-gray-200 transition-all"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetApp;
