"use client";

import { FaPlaneDeparture, FaMapMarkedAlt, FaSuitcaseRolling } from "react-icons/fa"; // Icons for sections

export default function HowDoWeWork() {
  return (
    <div
      className="relative flexCenter min-h-screen bg-cover bg-center bg-fixed py-12 px-6"
      style={{ backgroundImage: "url('/background.jpg')" }} // Your image as the background
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white max-w-4xl space-y-12">
        <h1 className="text-5xl font-bold mb-4 animate-fadeIn">How Do We Work?</h1>
        <p className="text-xl max-w-3xl mx-auto animate-fadeIn">
        Whether you're 18 or 80, PathfinderX makes exploring the world easy, fun, and accessible for everyone. From planning adventures to organizing itineraries, 
          we help you explore the world step-by-step with smart travel tools and personalized recommendations.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fadeIn">
          {/* Step 1 */}
          <div className="bg-white/20 p-8 rounded-3xl shadow-lg backdrop-blur-lg">
            <FaPlaneDeparture className="mx-auto text-6xl mb-4 text-white" />
            <h3 className="text-2xl font-semibold mb-2">Plan Your Trip</h3>
            <p className="text-lg">
              Choose your destination and we’ll help you create the perfect itinerary with AI-driven suggestions.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white/20 p-8 rounded-3xl shadow-lg backdrop-blur-lg">
            <FaMapMarkedAlt className="mx-auto text-6xl mb-4 text-white" />
            <h3 className="text-2xl font-semibold mb-2">Organize Your Itinerary</h3>
            <p className="text-lg">
              Organize your trip by scheduling flights, hotels, and experiences effortlessly in one place.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white/20 p-8 rounded-3xl shadow-lg backdrop-blur-lg">
            <FaSuitcaseRolling className="mx-auto text-6xl mb-4 text-white" />
            <h3 className="text-2xl font-semibold mb-2">Enjoy Your Journey</h3>
            <p className="text-lg">
              With everything ready, all you need to do is pack your bags and embark on your adventure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
