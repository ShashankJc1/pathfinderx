"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Map from "@/components/GoogleMap"; // Import GoogleMap component

// Luxury Travel destinations with lat and lng coordinates
const luxuryTravelDestinations = [
 [
  { "name": "Maldives", "image": "/maldives.jpg", "lat": 3.2028, "lng": 73.2207 },
  { "name": "Dubai, UAE", "image": "/dubai.jpg", "lat": 25.276987, "lng": 55.296249 },
  { "name": "Bora Bora, French Polynesia", "image": "/borabora.jpg", "lat": -16.5000, "lng": -151.7415 },
  { "name": "Santorini, Greece", "image": "/santorini.jpg", "lat": 36.3932, "lng": 25.4615 },
  { "name": "Paris, France", "image": "/paris.jpg", "lat": 48.8566, "lng": 2.3522 },
  { "name": "Maui, Hawaii, USA", "image": "/maui.jpg", "lat": 20.7984, "lng": -156.3319 },
  { "name": "Venice, Italy", "image": "/venice.jpg", "lat": 45.4408, "lng": 12.3155 },
  { "name": "Bali, Indonesia", "image": "/bali.jpg", "lat": -8.4095, "lng": 115.1889 },
  { "name": "Aspen, Colorado, USA", "image": "/aspen.jpg", "lat": 39.1911, "lng": -106.8175 },
  { "name": "Fiji", "image": "/fiji.jpg", "lat": -17.7134, "lng": 178.0650 },
  { "name": "Capri, Italy", "image": "/capri.jpg", "lat": 40.5505, "lng": 14.2273 },
  { "name": "Cappadocia, Turkey", "image": "/cappadocia.jpg", "lat": 38.6421, "lng": 34.8289 },
  { "name": "St. Tropez, France", "image": "/sttropez.jpg", "lat": 43.2630, "lng": 6.6457 },
  { "name": "The Seychelles", "image": "/seychelles.jpg", "lat": -4.6796, "lng": 55.4916 },
  { "name": "New York City, USA", "image": "/newyork.jpg", "lat": 40.7128, "lng": -74.0060 },
  { "name": "Queenstown, New Zealand", "image": "/queenstown.jpg", "lat": -45.0312, "lng": 168.6626 },
  { "name": "London, England", "image": "/london.jpg", "lat": 51.5074, "lng": -0.1278 },
  { "name": "Malibu, California, USA", "image": "/malibu.jpg", "lat": 34.0259, "lng": -118.7798 },
  { "name": "Riviera Maya, Mexico", "image": "/rivieramaya.jpg", "lat": 20.9626, "lng": -87.5326 },
  { "name": "Phuket, Thailand", "image": "/phuket.jpg", "lat": 7.8804, "lng": 98.3923 },
  { "name": "Tuscany, Italy", "image": "/tuscany.jpg", "lat": 43.3189, "lng": 11.3299 },
  { "name": "Zermatt, Switzerland", "image": "/zermatt.jpg", "lat": 46.0207, "lng": 7.7491 },
  { "name": "Dubai Marina, UAE", "image": "/dubaimarina.jpg", "lat": 25.0802, "lng": 55.1390 },
  { "name": "Hong Kong", "image": "/hongkong.jpg", "lat": 22.3964, "lng": 114.1095 },
  { "name": "Barcelona, Spain", "image": "/barcelona.jpg", "lat": 41.3851, "lng": 2.1734 },
  { "name": "Rio de Janeiro, Brazil", "image": "/riodejaneiro.jpg", "lat": -22.9068, "lng": -43.1729 },
  { "name": "Napa Valley, California, USA", "image": "/napavalley.jpg", "lat": 38.2975, "lng": -122.2869 },
  { "name": "Buenos Aires, Argentina", "image": "/buenosaires.jpg", "lat": -34.6037, "lng": -58.3816 },
  { "name": "Singapore", "image": "/singapore.jpg", "lat": 1.3521, "lng": 103.8198 },
  { "name": "Mykonos, Greece", "image": "/mykonos.jpg", "lat": 37.4467, "lng": 25.3289 },
  { "name": "Banff, Canada", "image": "/banff.jpg", "lat": 51.1784, "lng": -115.5708 },
  { "name": "Santorini, Greece", "image": "/santorini.jpg", "lat": 36.3932, "lng": 25.4615 },
  { "name": "Palm Springs, California, USA", "image": "/palmsprings.jpg", "lat": 33.8303, "lng": -116.5453 },
  { "name": "Maldives", "image": "/maldives.jpg", "lat": 3.2028, "lng": 73.2207 },
  { "name": "Koh Samui, Thailand", "image": "/kohsamui.jpg", "lat": 9.5128, "lng": 100.0131 },
  { "name": "Vancouver, Canada", "image": "/vancouver.jpg", "lat": 49.2827, "lng": -123.1207 },
  { "name": "Seychelles", "image": "/seychelles.jpg", "lat": -4.6796, "lng": 55.4916 },
  { "name": "Dubai, UAE", "image": "/dubai.jpg", "lat": 25.276987, "lng": 55.296249 },
  { "name": "Lisbon, Portugal", "image": "/lisbon.jpg", "lat": 38.7223, "lng": -9.1393 },
  { "name": "Marrakech, Morocco", "image": "/marrakech.jpg", "lat": 31.6340, "lng": -7.9956 },
  { "name": "Cannes, France", "image": "/cannes.jpg", "lat": 43.5511, "lng": 7.0128 },
  { "name": "Monte Carlo, Monaco", "image": "/montecarlo.jpg", "lat": 43.7384, "lng": 7.4246 }
]
  // Add more luxury travel destinations with lat/lng here...
];

export default function LuxuryTravel() {
  const [visibleDestinations, setVisibleDestinations] = useState(2);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition > threshold && visibleDestinations < luxuryTravelDestinations.length) {
      setVisibleDestinations((prevCount) => prevCount + 2);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleDestinations]);

  return (
    <section className="max-container padding-container py-16">
      <h1 className="text-center bold-40 lg:bold-64 mb-12">Luxury Travel Destinations</h1>
      <p className="text-center regular-20 text-gray-500 mb-16 max-w-3xl mx-auto">
        Experience the pinnacle of luxury at these world-class destinations, offering the finest accommodations and unparalleled service.
      </p>

      {/* Render Google Map with Luxury Travel Destinations */}
      <div className="mt-10">
        <Map destinations={luxuryTravelDestinations.filter(dest => dest.lat && dest.lng)} />
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {luxuryTravelDestinations.slice(0, visibleDestinations).map((destination, index) => (
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

      {visibleDestinations < luxuryTravelDestinations.length && (
        <div className="flexCenter mt-10">
          <p className="text-gray-500">Loading more destinations...</p>
        </div>
      )}
    </section>
  );
}
