"use client";

import Image from "next/image";

// Backpacking destinations data
const backpackingDestinations = [
  { name: "Patagonia, Argentina", image: "/patagonia.jpg" },
  { name: "Annapurna Circuit, Nepal", image: "/annapurna.jpg" },
  { name: "Inca Trail, Peru", image: "/inca-trail.jpg" },
  { name: "Mount Kilimanjaro, Tanzania", image: "/kilimanjaro.jpg" },
  { name: "Torres del Paine, Chile", image: "/torres-del-paine.jpg" },
  // Add the rest of your 50 destinations here
];

export default function Backpacking() {
  return (
    <section className="max-container padding-container py-16">
      <h1 className="text-center bold-40 lg:bold-64 mb-12">Backpacking Destinations</h1>
      <p className="text-center regular-20 text-gray-500 mb-16 max-w-3xl mx-auto">
        Discover the top backpacking destinations around the world. Explore beautiful locations and start planning your next adventure.
      </p>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {backpackingDestinations.map((destination, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              priority
              className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flexCenter transition-opacity duration-300 group-hover:bg-black/60">
              <h3 className="bold-24 lg:bold-32 text-white">{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
