"use client";

import Image from "next/image";
import Link from "next/link";

// Travel options data
const travelOptions = [
  {
    name: "Backpacking",
    image: "/backpacking.jpg",
    link: "/discover/backpacking",
  },
  {
    name: "Solo Travelling",
    image: "/solo-travel.jpg",
    link: "/discover/solo-travelling",
  },
  {
    name: "Cultural Travelling",
    image: "/cultural.jpg",
    link: "/discover/cultural-travelling",
  },
  {
    name: "Budget Travel",
    image: "/budget-travel.jpg",
    link: "/discover/budget-travel",
  },
  {
    name: "Adventure Travel",
    image: "/adventure.jpg",
    link: "/discover/adventure-travel",
  },
  {
    name: "Family Travel",
    image: "/family-travel.jpg",
    link: "/discover/family-travel",
  },
  {
    name: "Luxury Travel",
    image: "/luxury.jpg",
    link: "/discover/luxury-travel",
  },
];

export default function Discover() {
  return (
    <section className="bg-gradient-to-br from-gray-100 via-blue-50 to-white py-16 text-gray-800">
      <div className="max-container padding-container">
        <h1 className="text-center bold-40 lg:bold-64 mb-12 text-gray-900">
          Explore New Destinations
        </h1>
        <p className="text-center regular-20 text-gray-700 mb-16 max-w-3xl mx-auto">
          Explore hidden gems and top-rated travel spots and scenic locations. From breathtaking landscapes to vibrant cityscapes, PathfinderX offers personalized recommendations to make every journey unforgettable.
        </p>

        {/* Travel Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelOptions.map((option) => (
            <Link
              href={option.link}
              key={option.name}
              className="group relative block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-64 lg:h-80">
                <Image
                  src={option.image}
                  alt={option.name}
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 flexCenter transition-opacity duration-300 group-hover:bg-black/60">
                <h3 className="bold-24 lg:bold-32 text-white">{option.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
