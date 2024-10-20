"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Backpacking destinations data
const backpackingDestinations = [
  { name: "Patagonia, Argentina", image: "/patagonia.jpg" },
  { name: "Annapurna Circuit, Nepal", image: "/annapurna.jpg" },
  { name: "Inca Trail, Peru", image: "/inca-trail.jpg" },
  { name: "Mount Kilimanjaro, Tanzania", image: "/kilimanjaro.jpg" },
  { name: "Torres del Paine, Chile", image: "/torres-del-paine.jpg" },
  { name: "Pacific Crest Trail, USA", image: "/pacific-crest-trail.jpg" },
  { name: "Camino de Santiago, Spain", image: "/camino-de-santiago.jpg" },
  { name: "West Coast Trail, Canada", image: "/west-coast-trail.jpg" },
  { name: "Overland Track, Australia", image: "/overland-track.jpg" },
  { name: "Great Himalaya Trail, Nepal", image: "/great-himalaya-trail.jpg" },
  { name: "Laugavegur Trail, Iceland", image: "/laugavegur-trail.jpg" },
  { name: "John Muir Trail, USA", image: "/john-muir-trail.jpg" },
  { name: "Te Araroa Trail, New Zealand", image: "/te-araroa-trail.jpg" },
  { name: "Drakensberg Traverse, South Africa", image: "/drakensberg-traverse.jpg" },
  { name: "Haute Route, Switzerland", image: "/haute-route.jpg" },
  { name: "Kungsleden, Sweden", image: "/kungsleden.jpg" },
  { name: "Kalalau Trail, Hawaii, USA", image: "/kalalau-trail.jpg" },
  { name: "Bibbulmun Track, Australia", image: "/bibbulmun-track.jpg" },
  { name: "GR20, Corsica", image: "/gr20.jpg" },
  { name: "Dolomites, Italy", image: "/dolomites.jpg" },
  { name: "Toubkal Circuit, Morocco", image: "/toubkal-circuit.jpg" },
  { name: "Snowman Trek, Bhutan", image: "/snowman-trek.jpg" },
  { name: "Salkantay Trek, Peru", image: "/salkantay-trek.jpg" },
  { name: "Tiger Leaping Gorge, China", image: "/tiger-leaping-gorge.jpg" },
  { name: "Cinque Terre, Italy", image: "/cinque-terre.jpg" },
  { name: "Appalachian Trail, USA", image: "/appalachian-trail.jpg" },
  { name: "Fitz Roy Trek, Argentina", image: "/fitz-roy-trek.jpg" },
  { name: "Chilkoot Trail, Canada/USA", image: "/chilkoot-trail.jpg" },
  { name: "Everest Base Camp, Nepal", image: "/everest-base-camp.jpg" },
  { name: "Langtang Valley, Nepal", image: "/langtang-valley.jpg" }
  
  // Add the rest of your 50 destinations here
];

export default function Backpacking() {
  const [visibleDestinations, setVisibleDestinations] = useState(6);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition > threshold && visibleDestinations < backpackingDestinations.length) {
      setVisibleDestinations((prevCount) => prevCount + 3);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleDestinations]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-center text-4xl font-bold lg:text-6xl mb-12">Backpacking Destinations</h1>
      <p className="text-center text-lg text-gray-500 mb-16 max-w-3xl mx-auto">
        Discover the top backpacking destinations around the world. Explore beautiful locations and start planning your next adventure.
      </p>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {backpackingDestinations.slice(0, visibleDestinations).map((destination, index) => (
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
            <h3 className="text-xl font-semibold mt-4 text-center">{destination.name}</h3>
          </div>
        ))}
      </div>

      {visibleDestinations < backpackingDestinations.length && (
        <div className="flex justify-center mt-10">
          <p className="text-gray-500">Loading more destinations...</p>
        </div>
      )}
    </section>
  );
}
