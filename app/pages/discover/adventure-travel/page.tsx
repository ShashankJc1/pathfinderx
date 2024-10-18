"use client";

import Image from "next/image";

// Adventure Travel destinations data
const adventureTravelDestinations = [
  { name: "Mount Everest Base Camp, Nepal", image: "/everest-base-camp.jpg" },
  { name: "Grand Canyon, USA", image: "/grand-canyon.jpg" },
  { name: "Great Barrier Reef, Australia", image: "/great-barrier-reef.jpg" },
  { name: "Torres del Paine, Chile", image: "/torres-del-paine.jpg" },
  { name: "Zion National Park, USA", image: "/zion-national-park.jpg" },
  // Add the rest of your 50 destinations here
];

export default function AdventureTravel() {
  return (
    <section className="max-container padding-container py-16">
      <h1 className="text-center bold-40 lg:bold-64 mb-12">Adventure Travel Destinations</h1>
      <p className="text-center regular-20 text-gray-500 mb-16 max-w-3xl mx-auto">
        Discover the most thrilling adventure travel destinations around the world. Explore beautiful locations and push your limits with these exciting adventures.
      </p>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {adventureTravelDestinations.map((destination, index) => (
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
