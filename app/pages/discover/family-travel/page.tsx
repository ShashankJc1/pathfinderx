"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Map from "@/components/GoogleMap"; // Import GoogleMap component

// Family Travel destinations with lat and lng coordinates
const familyTravelDestinations = [
  [
  { "name": "Orlando, Florida, USA", "image": "/orlando.jpg", "lat": 28.5383, "lng": -81.3792 },
  { "name": "Tokyo Disneyland, Japan", "image": "/tokyo-disneyland.jpg", "lat": 35.6277, "lng": 139.8828 },
  { "name": "Paris Disneyland, France", "image": "/paris-disneyland.jpg", "lat": 48.8671, "lng": 2.7833 },
  { "name": "San Diego, California, USA", "image": "/sandiego.jpg", "lat": 32.7157, "lng": -117.1611 },
  { "name": "Legoland, California, USA", "image": "/legoland.jpg", "lat": 33.1260, "lng": -117.3506 },
  { "name": "Singapore Zoo, Singapore", "image": "/singapore-zoo.jpg", "lat": 1.4043, "lng": 103.7850 },
  { "name": "Universal Studios, Orlando, USA", "image": "/universal-orlando.jpg", "lat": 28.4724, "lng": -81.4660 },
  { "name": "Grand Canyon, Arizona, USA", "image": "/grandcanyon.jpg", "lat": 36.1069, "lng": -112.1129 },
  { "name": "Cedar Point, Ohio, USA", "image": "/cedarpoint.jpg", "lat": 41.4816, "lng": -82.6465 },
  { "name": "Niagara Falls, Canada", "image": "/niagarafalls.jpg", "lat": 43.0962, "lng": -79.0377 },
  { "name": "Lego House, Billund, Denmark", "image": "/legohouse.jpg", "lat": 55.7335, "lng": 9.1250 },
  { "name": "Washington, D.C., USA", "image": "/washingtondc.jpg", "lat": 38.9072, "lng": -77.0369 },
  { "name": "Barbados", "image": "/barbados.jpg", "lat": 13.1939, "lng": -59.5432 },
  { "name": "Yellowstone National Park, USA", "image": "/yellowstone.jpg", "lat": 44.4280, "lng": -110.5885 },
  { "name": "Sydney, Australia", "image": "/sydney.jpg", "lat": -33.8688, "lng": 151.2093 },
  { "name": "Cape Town, South Africa", "image": "/capetown.jpg", "lat": -33.9249, "lng": 18.4241 },
  { "name": "Los Angeles, California, USA", "image": "/losangeles.jpg", "lat": 34.0522, "lng": -118.2437 },
  { "name": "Barcelona, Spain", "image": "/barcelona.jpg", "lat": 41.3851, "lng": 2.1734 },
  { "name": "Toronto, Canada", "image": "/toronto.jpg", "lat": 43.6510, "lng": -79.3470 },
  { "name": "Amsterdam, Netherlands", "image": "/amsterdam.jpg", "lat": 52.3676, "lng": 4.9041 },
  { "name": "Amsterdam's NEMO Science Museum", "image": "/nemo.jpg", "lat": 52.3752, "lng": 4.9041 },
  { "name": "Dubai Parks and Resorts, UAE", "image": "/dubai-parks.jpg", "lat": 25.0710, "lng": 55.2315 },
  { "name": "Hong Kong Disneyland, Hong Kong", "image": "/hk-disneyland.jpg", "lat": 22.3120, "lng": 114.0413 },
  { "name": "Bora Bora, French Polynesia", "image": "/borabora.jpg", "lat": -16.5000, "lng": -151.7415 },
  { "name": "Cancun, Mexico", "image": "/cancun.jpg", "lat": 21.1619, "lng": -86.8515 },
  { "name": "Pigeon Forge, Tennessee, USA", "image": "/pigeonforge.jpg", "lat": 35.7852, "lng": -83.5560 },
  { "name": "Hershey, Pennsylvania, USA", "image": "/hershey.jpg", "lat": 40.2856, "lng": -76.6502 },
  { "name": "Montreal, Canada", "image": "/montreal.jpg", "lat": 45.5017, "lng": -73.5673 },
  { "name": "Brussels, Belgium", "image": "/brussels.jpg", "lat": 50.8503, "lng": 4.3517 },
  { "name": "Athens, Greece", "image": "/athens.jpg", "lat": 37.9838, "lng": 23.7275 },
  { "name": "Boston, Massachusetts, USA", "image": "/boston.jpg", "lat": 42.3601, "lng": -71.0589 },
  { "name": "San Francisco, California, USA", "image": "/sanfrancisco.jpg", "lat": 37.7749, "lng": -122.4194 },
  { "name": "Salzburg, Austria", "image": "/salzburg.jpg", "lat": 47.8095, "lng": 13.0550 },
  { "name": "Rio de Janeiro, Brazil", "image": "/riodejaneiro.jpg", "lat": -22.9068, "lng": -43.1729 },
  { "name": "Osaka, Japan", "image": "/osaka.jpg", "lat": 34.6937, "lng": 135.5023 },
  { "name": "Atlanta, Georgia, USA", "image": "/atlanta.jpg", "lat": 33.7490, "lng": -84.3880 },
  { "name": "Vancouver, Canada", "image": "/vancouver.jpg", "lat": 49.2827, "lng": -123.1207 },
  { "name": "Parks Canada", "image": "/parkscanada.jpg", "lat": 60.0000, "lng": -100.0000 },
  { "name": "Queenstown, New Zealand", "image": "/queenstown.jpg", "lat": -45.0312, "lng": 168.6626 },
  { "name": "Dubai, UAE", "image": "/dubai.jpg", "lat": 25.276987, "lng": 55.296249 },
  { "name": "Kuala Lumpur, Malaysia", "image": "/kualalumpur.jpg", "lat": 3.139,"lng": 101.6869 },
  { "name": "Lima, Peru", "image": "/lima.jpg", "lat": -12.0464, "lng": -77.0428 },
  { "name": "Lisbon, Portugal", "image": "/lisbon.jpg", "lat": 38.7223, "lng": -9.1393 }
]
  // Add more family travel destinations with lat/lng here...
];

const mapDestinations = familyTravelDestinations.flat().map(({ name, lat, lng }) => ({
  name,
  lat,
  lng,
}));

export default function FamilyTravel() {
  const [visibleDestinations, setVisibleDestinations] = useState(2);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 100;

    if (scrollPosition > threshold && visibleDestinations < familyTravelDestinations.flat().length) {
      setVisibleDestinations((prevCount) => prevCount + 2);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleDestinations]);

  return (
    <section className="max-container padding-container py-16">
      <h1 className="text-center bold-40 lg:bold-64 mb-12">Family Travel Destinations</h1>
      <p className="text-center regular-20 text-gray-500 mb-16 max-w-3xl mx-auto">
        Enjoy fun-filled family adventures at these top-rated destinations suitable for all ages.
      </p>

      {/* Render Google Map with Family Travel Destinations */}
      <div className="mt-10">
        <Map destinations={mapDestinations} />
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {familyTravelDestinations.flat().slice(0, visibleDestinations).map((destination, index) => (
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

      {visibleDestinations < familyTravelDestinations.flat().length && (
        <div className="flexCenter mt-10">
          <p className="text-gray-500">Loading more destinations...</p>
        </div>
      )}
    </section>
  );
}