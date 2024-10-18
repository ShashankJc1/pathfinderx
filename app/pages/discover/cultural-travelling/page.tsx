"use client";

import Image from "next/image";

// Cultural Travelling destinations data
const culturalTravellingDestinations = [
  { name: "Kyoto, Japan", image: "/kyoto.jpg" },
  { name: "Rome, Italy", image: "/rome.jpg" },
  { name: "Cairo, Egypt", image: "/cairo.jpg" },
  { name: "Machu Picchu, Peru", image: "/machu-picchu.jpg" },
  { name: "Istanbul, Turkey", image: "/istanbul.jpg" },
  // Add the rest of your 50 destinations here
];

export default function CulturalTravelling() {
  return (
    <section className="max-container padding-container py-16">
      <h1 className="text-center bold-40 lg:bold-64 mb-12">Cultural Travelling Destinations</h1>
      <p className="text-center regular-20 text-gray-500 mb-16 max-w-3xl mx-auto">
        Discover the most culturally rich destinations around the world. Explore ancient cities, historic landmarks, and immerse yourself in vibrant cultures.
      </p>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {culturalTravellingDestinations.map((destination, index) => (
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
