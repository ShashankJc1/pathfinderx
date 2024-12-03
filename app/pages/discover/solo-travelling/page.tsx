"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Map from "@/components/GoogleMap"; // Import GoogleMap component

// Solo Travelling destinations with lat and lng coordinates
const soloTravelDestinations = [
 [
  { "name": "Bali, Indonesia", "image": "/bali.jpg", "lat": -8.3405, "lng": 115.0920 },
  { "name": "Tokyo, Japan", "image": "/tokyo.jpg", "lat": 35.6762, "lng": 139.6503 },
  { "name": "Barcelona, Spain", "image": "/barcelona.jpg", "lat": 41.3851, "lng": 2.1734 },
  { "name": "Bangkok, Thailand", "image": "/bangkok.jpg", "lat": 13.7563, "lng": 100.5018 },
  { "name": "Lisbon, Portugal", "image": "/lisbon.jpg", "lat": 38.7223, "lng": -9.1393 },
  { "name": "Prague, Czech Republic", "image": "/prague.jpg", "lat": 50.0755, "lng": 14.4378 },
  { "name": "Melbourne, Australia", "image": "/melbourne.jpg", "lat": -37.8136, "lng": 144.9631 },
  { "name": "New York City, USA", "image": "/newyork.jpg", "lat": 40.7128, "lng": -74.0060 },
  { "name": "Hanoi, Vietnam", "image": "/hanoi.jpg", "lat": 21.0285, "lng": 105.8542 },
  { "name": "Reykjavik, Iceland", "image": "/reykjavik.jpg", "lat": 64.1355, "lng": -21.8954 },
  { "name": "Dublin, Ireland", "image": "/dublin.jpg", "lat": 53.3498, "lng": -6.2603 },
  { "name": "Berlin, Germany", "image": "/berlin.jpg", "lat": 52.5200, "lng": 13.4050 },
  { "name": "Buenos Aires, Argentina", "image": "/buenosaires.jpg", "lat": -34.6037, "lng": -58.3816 },
  { "name": "Seoul, South Korea", "image": "/seoul.jpg", "lat": 37.5665, "lng": 126.9780 },
  { "name": "Chiang Mai, Thailand", "image": "/chiangmai.jpg", "lat": 18.7883, "lng": 98.9853 },
  { "name": "Amsterdam, Netherlands", "image": "/amsterdam.jpg", "lat": 52.3676, "lng": 4.9041 },
  { "name": "Taipei, Taiwan", "image": "/taipei.jpg", "lat": 25.0330, "lng": 121.5654 },
  { "name": "Cape Town, South Africa", "image": "/capetown.jpg", "lat": -33.9249, "lng": 18.4241 },
  { "name": "Montreal, Canada", "image": "/montreal.jpg", "lat": 45.5017, "lng": -73.5673 },
  { "name": "Oslo, Norway", "image": "/oslo.jpg", "lat": 59.9139, "lng": 10.7522 },
  { "name": "Copenhagen, Denmark", "image": "/copenhagen.jpg", "lat": 55.6761, "lng": 12.5683 },
  { "name": "Singapore", "image": "/singapore.jpg", "lat": 1.3521, "lng": 103.8198 },
  { "name": "Kyoto, Japan", "image": "/kyoto.jpg", "lat": 35.0116, "lng": 135.7681 },
  { "name": "Budapest, Hungary", "image": "/budapest.jpg", "lat": 47.4979, "lng": 19.0402 },
  { "name": "Lima, Peru", "image": "/lima.jpg", "lat": -12.0464, "lng": -77.0428 },
  { "name": "Lisbon, Portugal", "image": "/lisbon.jpg", "lat": 38.7223, "lng": -9.1393 },
  { "name": "Valencia, Spain", "image": "/valencia.jpg", "lat": 39.4699, "lng": -0.3763 },
  { "name": "Krakow, Poland", "image": "/krakow.jpg", "lat": 50.0647, "lng": 19.9450 },
  { "name": "Stockholm, Sweden", "image": "/stockholm.jpg", "lat": 59.3293, "lng": 18.0686 },
  { "name": "Nairobi, Kenya", "image": "/nairobi.jpg", "lat": -1.2864, "lng": 36.8172 },
  { "name": "Malaga, Spain", "image": "/malaga.jpg", "lat": 36.7213, "lng": -4.4214 },
  { "name": "Tbilisi, Georgia", "image": "/tbilisi.jpg", "lat": 41.7151, "lng": 44.8271 },
  { "name": "Cartagena, Colombia", "image": "/cartagena.jpg", "lat": 10.3910, "lng": -75.4794 },
  { "name": "Sofia, Bulgaria", "image": "/sofia.jpg", "lat": 42.6977, "lng": 23.3219 },
  { "name": "Freiburg, Germany", "image": "/freiburg.jpg", "lat": 47.9990, "lng": 7.8421 },
  { "name": "Zagreb, Croatia", "image": "/zagreb.jpg", "lat": 45.8150, "lng": 15.9819 },
  { "name": "Bucharest, Romania", "image": "/bucharest.jpg", "lat": 44.4268, "lng": 26.1025 },
  { "name": "Tallinn, Estonia", "image": "/tallinn.jpg", "lat": 59.4372, "lng": 24.7536 },
  { "name": "Kuala Lumpur, Malaysia", "image": "/kualalumpur.jpg", "lat": 3.139,"lng": 101.6869 },
  { "name": "Riga, Latvia", "image": "/riga.jpg", "lat": 56.9496, "lng": 24.1052 },
  { "name": "Helsinki, Finland", "image": "/helsinki.jpg", "lat": 60.1695, "lng": 24.9354 },
  { "name": "Tunis, Tunisia", "image": "/tunis.jpg", "lat": 36.8065, "lng": 10.1815 },
  { "name": "Marrakech, Morocco", "image": "/marrakech.jpg", "lat": 31.6340, "lng": -7.9956 },
  { "name": "Fes, Morocco", "image": "/fes.jpg", "lat": 34.0372, "lng": -5.0023 },
  { "name": "Osaka, Japan", "image": "/osaka.jpg", "lat": 34.6937, "lng": 135.5023 },
  { "name": "Canggu, Indonesia", "image": "/canggu.jpg", "lat": -8.6341, "lng": 115.0864 },
  { "name": "La Paz, Bolivia", "image": "/lapaz.jpg", "lat": -16.5000, "lng": -68.1193 },
  { "name": "Hokkaido, Japan", "image": "/hokkaido.jpg", "lat": 43.0642, "lng": 141.3469 }
]
  // Add more solo travel destinations with lat/lng here...
];

const mapDestinations = soloTravelDestinations.flat().map(({ name, lat, lng }) => ({
  name,
  lat,
  lng,
}));

export default function SoloTravelling() {
  const [visibleDestinations, setVisibleDestinations] = useState(2);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition > threshold && visibleDestinations < soloTravelDestinations.length) {
      setVisibleDestinations((prevCount) => prevCount + 2);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleDestinations]);

  return (
    <section className="max-container padding-container py-16">
      <h1 className="text-center bold-40 lg:bold-64 mb-12">Solo Travelling Destinations</h1>
      <p className="text-center regular-20 text-gray-500 mb-16 max-w-3xl mx-auto">
        Explore the best destinations for solo travellers, from serene beaches to bustling cities.
      </p>

      {/* Render Google Map with Solo Travel Destinations */}
      <div className="mt-10">
        <Map destinations={mapDestinations} />
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {soloTravelDestinations.flat().slice(0, visibleDestinations).map((destination, index) => (
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

      {visibleDestinations < soloTravelDestinations.length && (
        <div className="flexCenter mt-10">
          <p className="text-gray-500">Loading more destinations...</p>
        </div>
      )}
    </section>
  );
}