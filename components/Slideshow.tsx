"use client";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css"; // Import Swiper core CSS
import Image from "next/image";

// Destination data
const destinations = [
  { name: "Bali, Indonesia", description: "Magical beaches and culture.", image: "/bali.jpg" },
  { name: "Santorini, Greece", description: "Stunning sunsets.", image: "/santorini.jpg" },
  { name: "Kyoto, Japan", description: "Temples and blossoms.", image: "/kyoto.jpg" },
  { name: "Banff, Canada", description: "Breathtaking Rockies.", image: "/banff.jpg" },
  { name: "Paris, France", description: "Eiffel Tower & cuisine.", image: "/paris.jpeg" },
  { name: "Maui, Hawaii", description: "Lush beaches & landscapes.", image: "/maui.jpg" },
  { name: "Cairo, Egypt", description: "Explore ancient pyramids.", image: "/cairo.jpg" },
  { name: "Rome, Italy", description: "Discover Roman history.", image: "/rome.webp" },
  { name: "New York, USA", description: "The city that never sleeps.", image: "/newyork.jpeg" },
  { name: "Sydney, Australia", description: "Opera House & Harbor.", image: "/sydney.jpg" },
];

// Custom button component to control Swiper
const CustomNavigationButtons = () => {
  const swiper = useSwiper(); // Access the swiper instance to control slides

  return (
    <div className="mt-4 flex justify-center space-x-4">
      {/* Custom Previous Button */}
      <button
        onClick={() => swiper.slidePrev()}
        className="bg-white text-black rounded-full p-3 shadow-md hover:bg-gray-200 transition-all"
      >
        ◀
      </button>

      {/* Custom Next Button */}
      <button
        onClick={() => swiper.slideNext()}
        className="bg-white text-black rounded-full p-3 shadow-md hover:bg-gray-200 transition-all"
      >
        ▶
      </button>
    </div>
  );
};

const GetApp = () => {
  return (
    <section className="get-app bg-gradient-to-br from-green-400 to-blue-500 py-12 px-6 text-white">
      <div className="max-container mx-auto text-center">
        <h2 className="bold-40 lg:bold-64 mb-6">Explore Beautiful Destinations</h2>
        <p className="regular-20 mb-12">Your next adventure awaits!</p>

        <Swiper
          slidesPerView={5} // Display 5 slides at a time
          spaceBetween={30} // Space between each slide
          className="mySwiper"
        >
          {destinations.map((destination, index) => (
            <SwiperSlide key={index}>
              <div className="relative group overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flexCenter flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="bold-20">{destination.name}</h3>
                  <p className="regular-16 mt-2">{destination.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <CustomNavigationButtons />
        </Swiper>
      </div>
    </section>
  );
};

export default GetApp;
