"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Map from "@/components/GoogleMap"; // Import GoogleMap component

// Budget Travel destinations with lat and lng coordinates
const budgetTravelDestinations = [
 [
  { "name": "Bangkok, Thailand", "image": "/bangkok.jpg", "lat": 13.7563, "lng": 100.5018 },
  { "name": "Lisbon, Portugal", "image": "/lisbon.jpg", "lat": 38.7223, "lng": -9.1393 },
  { "name": "Budapest, Hungary", "image": "/budapest.jpg", "lat": 47.4979, "lng": 19.0402 },
  { "name": "Prague, Czech Republic", "image": "/prague.jpg", "lat": 50.0755, "lng": 14.4378 },
  { "name": "Bali, Indonesia", "image": "/bali.jpg", "lat": -8.4095, "lng": 115.1889 },
  { "name": "Mexico City, Mexico", "image": "/mexicocity.jpg", "lat": 19.4326, "lng": -99.1332 },
  { "name": "Hanoi, Vietnam", "image": "/hanoi.jpg", "lat": 21.0285, "lng": 105.8542 },
  { "name": "Sofia, Bulgaria", "image": "/sofia.jpg", "lat": 42.6977, "lng": 23.3219 },
  { "name": "Krakow, Poland", "image": "/krakow.jpg", "lat": 50.0647, "lng": 19.9450 },
  { "name": "Delhi, India", "image": "/delhi.jpg", "lat": 28.6139, "lng": 77.2090 },
  { "name": "Valencia, Spain", "image": "/valencia.jpg", "lat": 39.4699, "lng": -0.3763 },
  { "name": "Marrakech, Morocco", "image": "/marrakech.jpg", "lat": 31.6340, "lng": -7.9956 },
  { "name": "Budva, Montenegro", "image": "/budva.jpg", "lat": 42.2872, "lng": 18.8401 },
  { "name": "Chiang Mai, Thailand", "image": "/chiangmai.jpg", "lat": 18.7884, "lng": 98.9853 },
  { "name": "Nairobi, Kenya", "image": "/nairobi.jpg", "lat": -1.2864, "lng": 36.8172 },
  { "name": "Lima, Peru", "image": "/lima.jpg", "lat": -12.0464, "lng": -77.0428 },
  { "name": "Lisbon, Portugal", "image": "/lisbon.jpg", "lat": 38.7223, "lng": -9.1393 },
  { "name": "Tbilisi, Georgia", "image": "/tbilisi.jpg", "lat": 41.7151, "lng": 44.8271 },
  { "name": "Yerevan, Armenia", "image": "/yerevan.jpg", "lat": 40.1792, "lng": 44.4991 },
  { "name": "Gdańsk, Poland", "image": "/gdansk.jpg", "lat": 54.3520, "lng": 18.6466 },
  { "name": "Tallinn, Estonia", "image": "/tallinn.jpg", "lat": 59.4372, "lng": 24.7536 },
  { "name": "Riga, Latvia", "image": "/riga.jpg", "lat": 56.9496, "lng": 24.1052 },
  { "name": "Zagreb, Croatia", "image": "/zagreb.jpg", "lat": 45.8150, "lng": 15.9819 },
  { "name": "Sofia, Bulgaria", "image": "/sofia.jpg", "lat": 42.6977, "lng": 23.3219 },
  { "name": "Bratislava, Slovakia", "image": "/bratislava.jpg", "lat": 48.1482, "lng": 17.1067 },
  { "name": "Sarajevo, Bosnia and Herzegovina", "image": "/sarajevo.jpg", "lat": 43.8486, "lng": 18.3564 },
  { "name": "Cebu, Philippines", "image": "/cebu.jpg", "lat": 10.3157, "lng": 123.8854 },
  { "name": "Tunis, Tunisia", "image": "/tunis.jpg", "lat": 36.8065, "lng": 10.1815 },
  { "name": "Bucharest, Romania", "image": "/bucharest.jpg", "lat": 44.4268, "lng": 26.1025 },
  { "name": "Algiers, Algeria", "image": "/algiers.jpg", "lat": 36.7538, "lng": 3.0588 },
  { "name": "Colombo, Sri Lanka", "image": "/colombo.jpg", "lat": 6.9271, "lng": 79.9612 },
  { "name": "Hvar, Croatia", "image": "/hvar.jpg", "lat": 43.1730, "lng": 16.4412 },
  { "name": "La Paz, Bolivia", "image": "/lapaz.jpg", "lat": -16.5000, "lng": -68.1193 },
  { "name": "Catania, Italy", "image": "/catania.jpg", "lat": 37.5079, "lng": 15.0830 },
  { "name": "Puebla, Mexico", "image": "/puebla.jpg", "lat": 19.0402, "lng": -98.2032 },
  { "name": "Bergen, Norway", "image": "/bergen.jpg", "lat": 60.3920, "lng": 5.3240 },
  { "name": "Tbilisi, Georgia", "image": "/tbilisi.jpg", "lat": 41.7151, "lng": 44.8271 },
  { "name": "Kotor, Montenegro", "image": "/kotor.jpg", "lat": 42.4240, "lng": 18.7712 },
  { "name": "Vientiane, Laos", "image": "/vientiane.jpg", "lat": 17.9757, "lng": 102.6331 },
  { "name": "Santiago, Chile", "image": "/santiago.jpg", "lat": -33.4489, "lng": -70.6693 },
  { "name": "Ho Chi Minh City, Vietnam", "image": "/hochiminhcity.jpg", "lat": 10.8231, "lng": 106.6297 }
]

  // Add more budget travel destinations with lat/lng here...
];

export default function BudgetTravel() {
  const [visibleDestinations, setVisibleDestinations] = useState(2);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition > threshold && visibleDestinations < budgetTravelDestinations.length) {
      setVisibleDestinations((prevCount) => prevCount + 2);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleDestinations]);

  return (
    <section className="max-container padding-container py-16">
      <h1 className="text-center bold-40 lg:bold-64 mb-12">Budget Travel Destinations</h1>
      <p className="text-center regular-20 text-gray-500 mb-16 max-w-3xl mx-auto">
        Discover affordable travel spots that offer unforgettable experiences without breaking the bank.
      </p>

      {/* Render Google Map with Budget Travel Destinations */}
      <div className="mt-10">
        <Map destinations={budgetTravelDestinations.filter(dest => dest.lat && dest.lng)} />
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {budgetTravelDestinations.slice(0, visibleDestinations).map((destination, index) => (
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

      {visibleDestinations < budgetTravelDestinations.length && (
        <div className="flexCenter mt-10">
          <p className="text-gray-500">Loading more destinations...</p>
        </div>
      )}
    </section>
  );
}
