"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Map from "@/components/GoogleMap"; // Import GoogleMap component

// Adventure Travel destinations with lat and lng coordinates
const adventureTravelDestinations = [
  { name: "Grand Canyon, USA", image: "/grand-canyon.jpg", lat: 36.1069, lng: -112.1129 },
  { name: "Banff National Park, Canada", image: "/banff.jpg", lat: 51.4968, lng: -115.9281 },
  { name: "Machu Picchu, Peru", image: "/machu-picchu.jpg", lat: -13.1631, lng: -72.545 },
  { name: "Torres del Paine, Chile", image: "/torres-del-paine.jpg", lat: -51.2538, lng: -72.3364 },
  { name: "Mount Kilimanjaro, Tanzania", image: "/mount-kilimanjaro.jpg", lat: -3.0674, lng: 37.3556 },
  { name: "Queenstown, New Zealand", image: "/queenstown.jpg", lat: -45.0312, lng: 168.6626 },
  { name: "Patagonia, Argentina", image: "/patagonia.jpg", lat: -50.9439, lng: -73.3282 },
  { name: "Iceland Ring Road, Iceland", image: "/iceland-ring-raod.png", lat: 65.0, lng: -18.0 },
  { name: "Zion National Park, USA", image: "/zion-national-park.jpg", lat: 37.2982, lng: -113.0263 },
  { name: "Moab, USA", image: "/moab.jpg", lat: 38.5733, lng: -109.5498 },
  { name: "Antelope Canyon, USA", image: "/antelope-canyon.jpg", lat: 36.8619, lng: -111.3743 },
  { name: "Yosemite National Park, USA", image: "/yosemite.jpg", lat: 37.8651, lng: -119.5383 },
  { name: "Great Barrier Reef, Australia", image: "/great-barrier-reef.jpg", lat: -18.2861, lng: 147.7 },
  { name: "Blue Mountains, Australia", image: "/blue-mountains.jpg", lat: -33.7139, lng: 150.3119 },
  { name: "Whistler, Canada", image: "/whistler.jpg", lat: 50.1163, lng: -122.9574 },
  { name: "Swiss Alps, Switzerland", image: "/swiss-alps.jpg", lat: 46.8182, lng: 8.2275 },
  { name: "Serengeti, Tanzania", image: "/serengeti.jpg", lat: -2.3333, lng: 34.8333 },
  { name: "Namib Desert, Namibia", image: "/namib-desert.jpg", lat: -24.7821, lng: 15.3339 },
  { name: "Alaska Wilderness, USA", image: "/alaska-bear.jpg", lat: 64.2008, lng: -149.4937 },
  { name: "Himalayas, Nepal", image: "/himalayas.jpg", lat: 27.9881, lng: 86.925 },
];

export default function AdventureTravel() {
  const [visibleDestinations, setVisibleDestinations] = useState(6);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (
      scrollPosition > threshold &&
      visibleDestinations < adventureTravelDestinations.length
    ) {
      setVisibleDestinations((prevCount) => prevCount + 3);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleDestinations]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-center text-4xl font-bold lg:text-6xl mb-12">
        Adventure Travel Destinations
      </h1>
      <p className="text-center text-lg text-gray-500 mb-16 max-w-3xl mx-auto">
        Discover the most thrilling adventure travel destinations around the world.
      </p>

      {/* Render Google Map with Adventure Travel Destinations */}
      <div className="mt-10">
        <Map
          destinations={adventureTravelDestinations.filter(
            (dest) => dest.lat && dest.lng
          )}
        />
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {adventureTravelDestinations
          .slice(0, visibleDestinations)
          .map((destination, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full h-64 relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-center">
                {destination.name}
              </h3>
            </div>
          ))}
      </div>

      {visibleDestinations < adventureTravelDestinations.length && (
        <div className="flex justify-center mt-10">
          <p className="text-gray-500">Loading more destinations...</p>
        </div>
      )}
    </section>
  );
}
