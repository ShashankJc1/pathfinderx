"use client"; // Declare this as a client component

import Image from 'next/image';
import Button from './Button';
import { useEffect } from 'react';
import { motion } from 'framer-motion'; // Framer Motion for animations

const Hero = () => {
  useEffect(() => {
    // Trigger animations on scroll if needed
  }, []);

  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />

      <motion.div 
        className="relative z-20 flex flex-1 flex-col xl:w-1/2"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image 
            src="/globe.jpg" 
            alt="globe" 
            width={50} 
            height={50} 
            className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px] parallax" 
          />
        </motion.div>
        
        <h1 className="bold-52 lg:bold-88">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            Discover Amazing Adventures
          </motion.span>
        </h1>
        
        <motion.p 
          className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          Embark on unforgettable journeys and explore hidden gems around the world. With us, every trip becomes a unique adventure filled with excitement and new experiences.
        </motion.p>

        <motion.div 
          className="my-11 flex flex-wrap gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          <div className="flex items-center gap-2">
            {Array(5).fill(1).map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.4 }}
              >
                <Image 
                  src="/star.svg" 
                  alt="star" 
                  width={24} 
                  height={24} 
                />
              </motion.div>
            ))}
          </div>

          <p className="bold-16 lg:bold-20 text-blue-70">
            250k<span className="regular-16 lg:regular-20 ml-1"> Happy Travelers</span>
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col w-full gap-3 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          <Button 
            type="button" 
            title="Book Your Trip" 
            variant="btn_green" 
            className="hover:scale-105 transition-transform duration-300" // Custom className here
          />
          <Button 
            type="button" 
            title="Watch Video" 
            icon="/play.svg" 
            variant="btn_white_text" 
            className="hover:scale-105 transition-transform duration-300" // Custom className here
          />
        </motion.div>
      </motion.div>

      <motion.div 
        className="relative flex flex-1 items-start"
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-blue-90 px-7 py-8">
          <div className="flex flex-col">
            <div className="flexBetween">
              <p className="regular-16 text-gray-20">Next Destination</p>
              <Image src="/close.svg" alt="close" width={24} height={24} />
            </div>
            <p className="bold-20 text-black">Santorini, Greece</p>
          </div>

          <div className="flexBetween">
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Distance</p>
              <p className="bold-20 text-black">2300 mi</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Weather</p>
              <p className="bold-20 text-black">Sunny, 25°C</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
