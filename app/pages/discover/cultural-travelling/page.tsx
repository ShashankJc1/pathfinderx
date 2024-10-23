"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Map from "@/components/GoogleMap"; // Import GoogleMap component

// Cultural Travelling destinations with lat and lng coordinates
const culturalTravelDestinations = [
 [
  { "name": "Kyoto, Japan", "image": "/kyoto.jpg", "lat": 35.0116, "lng": 135.7681 },
  { "name": "Rome, Italy", "image": "/rome.webp", "lat": 41.9028, "lng": 12.4964 },
  { "name": "Istanbul, Turkey", "image": "/istanbul.jpg", "lat": 41.0082, "lng": 28.9784 },
  { "name": "Cairo, Egypt", "image": "/cairo.jpg", "lat": 30.0444, "lng": 31.2357 },
  { "name": "Beijing, China", "image": "/beijing.jpg", "lat": 39.9042, "lng": 116.4074 },
  { "name": "Athens, Greece", "image": "/athens.jpg", "lat": 37.9838, "lng": 23.7275 },
  { "name": "Marrakech, Morocco", "image": "/marrakech.jpg", "lat": 31.6340, "lng": -7.9956 },
  { "name": "Varanasi, India", "image": "/varanasi.jpg", "lat": 25.3176, "lng": 82.9739 },
  { "name": "Havana, Cuba", "image": "/havana.jpg", "lat": 23.1136, "lng": -82.3666 },
  { "name": "Mexico City, Mexico", "image": "/mexicocity.jpg", "lat": 19.4326, "lng": -99.1332 },
  { "name": "Jerusalem, Israel", "image": "/jerusalem.jpg", "lat": 31.7683, "lng": 35.2137 },
  { "name": "Florence, Italy", "image": "/florence.jpg", "lat": 43.7696, "lng": 11.2550 },
  { "name": "Cusco, Peru", "image": "/cusco.jpg", "lat": -13.5319, "lng": -71.9675 },
  { "name": "Angkor Wat, Cambodia", "image": "/angkorwat.jpg", "lat": 13.4125, "lng": 103.8662 },
  { "name": "Lisbon, Portugal", "image": "/lisbon.jpg", "lat": 38.7223, "lng": -9.1393 },
  { "name": "St. Petersburg, Russia", "image": "/stpetersburg.jpg", "lat": 59.9343, "lng": 30.3351 },
  { "name": "Rio de Janeiro, Brazil", "image": "/riodejaneiro.jpg", "lat": -22.9068, "lng": -43.1729 },
  { "name": "Tokyo, Japan", "image": "/tokyo.jpg", "lat": 35.6824, "lng": 139.7590 },
  { "name": "Bangkok, Thailand", "image": "/bangkok.jpg", "lat": 13.7563, "lng": 100.5018 },
  { "name": "Seoul, South Korea", "image": "/seoul.jpg", "lat": 37.5665, "lng": 126.9780 },
  { "name": "Vienna, Austria", "image": "/vienna.jpg", "lat": 48.2082, "lng": 16.3738 },
  { "name": "Bali, Indonesia", "image": "/bali.jpg", "lat": -8.4095, "lng": 115.1889 },
  { "name": "Mumbai, India", "image": "/mumbai.jpg", "lat": 19.0760, "lng": 72.8777 },
  { "name": "Berlin, Germany", "image": "/berlin.jpg", "lat": 52.5200, "lng": 13.4050 },
  { "name": "Brussels, Belgium", "image": "/brussels.jpg", "lat": 50.8503, "lng": 4.3517 },
  { "name": "Helsinki, Finland", "image": "/helsinki.jpg", "lat": 60.1695, "lng": 24.9354 },
  { "name": "Hanoi, Vietnam", "image": "/hanoi.jpg", "lat": 21.0285, "lng": 105.8542 },
  { "name": "Tunis, Tunisia", "image": "/tunis.jpg", "lat": 36.8065, "lng": 10.1815 },
  { "name": "Catania, Italy", "image": "/catania.jpg", "lat": 37.5079, "lng": 15.0830 },
  { "name": "Stockholm, Sweden", "image": "/stockholm.jpg", "lat": 59.3293, "lng": 18.0686 },
  { "name": "Budapest, Hungary", "image": "/budapest.jpg", "lat": 47.4979, "lng": 19.0402 },
  { "name": "Quebec City, Canada", "image": "/quebec.jpg", "lat": 46.8139, "lng": -71.2082 },
  { "name": "Edinburgh, Scotland", "image": "/edinburgh.jpg", "lat": 55.9533, "lng": -3.1883 },
  { "name": "Lima, Peru", "image": "/lima.jpg", "lat": -12.0464, "lng": -77.0428 },
  { "name": "Amsterdam, Netherlands", "image": "/amsterdam.jpg", "lat": 52.3676, "lng": 4.9041 },
  { "name": "Shanghai, China", "image": "/shanghai.jpg", "lat": 31.2304, "lng": 121.4737 },
  { "name": "Oslo, Norway", "image": "/oslo.jpg", "lat": 59.9139, "lng": 10.7522 },
  { "name": "Krakow, Poland", "image": "/krakow.jpg", "lat": 50.0647, "lng": 19.9450 },
  { "name": "Antigua, Guatemala", "image": "/antigua.jpg", "lat": 14.7359, "lng": -90.7304 },
  { "name": "Dublin, Ireland", "image": "/dublin.jpg", "lat": 53.3498, "lng": -6.2603 },
  { "name": "Bologna, Italy", "image": "/bologna.jpg", "lat": 44.4949, "lng": 11.3426 },
  { "name": "Salzburg, Austria", "image": "/salzburg.jpg", "lat": 47.8095, "lng": 13.0550 },
  { "name": "Vatican City", "image": "/vaticancity.jpg", "lat": 41.9029, "lng": 12.4534 }
]
  // Add more cultural travel destinations with lat/lng here...
];

export default function CulturalTravelling() {
  const [visibleDestinations, setVisibleDestinations] = useState(2);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition > threshold && visibleDestinations < culturalTravelDestinations.length) {
      setVisibleDestinations((prevCount) => prevCount + 2);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleDestinations]);

  return (
    <section className="max-container padding-container py-16">
      <h1 className="text-center bold-40 lg:bold-64 mb-12">Cultural Travelling Destinations</h1>
      <p className="text-center regular-20 text-gray-500 mb-16 max-w-3xl mx-auto">
        Immerse yourself in rich cultural experiences and discover ancient traditions across the globe.
      </p>

      {/* Render Google Map with Cultural Travel Destinations */}
      <div className="mt-10">
        <Map destinations={culturalTravelDestinations.filter(dest => dest.lat && dest.lng)} />
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {culturalTravelDestinations.slice(0, visibleDestinations).map((destination, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Image
              src={destination.image}
              alt={destination.name}
              width={500}
              height={500}
              className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 flexCenter transition-opacity duration-300 group-hover:bg-black/60">
              <h3 className="bold-24 lg:bold-32 text-white">{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {visibleDestinations < culturalTravelDestinations.length && (
        <div className="flexCenter mt-10">
          <p className="text-gray-500">Loading more destinations...</p>
        </div>
      )}
    </section>
  );
}
