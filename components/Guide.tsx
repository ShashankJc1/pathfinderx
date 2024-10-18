"use client"; // Mark this as a client component

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion'; // For animations

const Guide = () => {
  return (
    <section className="flexCenter flex-col">
      <div className="padding-container max-container w-full pb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image src="/camp.svg" alt="camp" width={50} height={50} />
        </motion.div>

        <motion.p
          className="uppercase regular-18 -mt-1 mb-3 text-green-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          We are here for you to
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-between gap-5 lg:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">
            Guide You to Easy Paths
          </h2>
          <p className="regular-16 text-gray-30 xl:max-w-[520px]">
            With the PathfinderX, you’ll never get lost again. We provide offline maps for areas without internet. Invite your friends and family to explore wilderness trails, discover hidden valleys, and reach the peaks together.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="flexCenter max-container relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image 
          src="/alaska.jpg"
          alt="boat"
          width={1440}
          height={580}
          className="w-full object-cover object-center 2xl:rounded-5xl"
        />

        <motion.div
          className="absolute flex bg-white/90 py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }} // Hover effect
        >
          <Image 
            src="/meter.svg"
            alt="meter"
            width={16}
            height={158}
            className="h-full w-auto"
          />
          <div className="flexBetween flex-col">
            <div className="flex w-full flex-col">
              <div className="flexBetween w-full">
                <p className="regular-16 text-gray-20">Destination</p>
                <p className="bold-16 text-green-50">12 Hrs</p>
              </div>
              <p className="bold-20 mt-2">Holgate Glacier, Alaska</p>
            </div>

            <div className="flex w-full flex-col mt-4">
              <p className="regular-16 text-gray-20">Start Journey</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">
                Hoboken, New Jersey
              </h4>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Guide;
