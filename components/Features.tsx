"use client"; // Ensuring this is a client component

import { FEATURES } from "@/constants";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion"; // For animations

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24">
      <div className="max-container padding-container relative flex flex-col-reverse lg:flex-row items-center justify-between">
        
        {/* Phone Image Section */}
        <motion.div
          className="relative flex-1 flexCenter h-auto"
          initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
          animate={{ opacity: 1, y: 0 }}  // Animate to full opacity and original position
          transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
        >
          <div className="relative w-full max-w-[600px] aspect-[9/19] lg:max-w-[800px]">
            <Image
              src="/phone.png"
              alt="phone"
              fill
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
        </motion.div>

        {/* Features List Section */}
        <motion.div
          className="z-20 flex flex-col flex-1 lg:w-[60%] text-center lg:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} // Staggered animation for features
        >
          <h2 className="bold-40 lg:bold-64 mb-6">Our Features</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-20">
            {FEATURES.map((feature, index) => (
              <motion.li
                key={feature.title}
                className="flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }} // Hover effect to scale up slightly
              >
                <div className="rounded-full p-4 lg:p-7 bg-green-50">
                  <Image src={feature.icon} alt={feature.title} width={28} height={28} />
                </div>
                <h2 className="bold-20 lg:bold-32 mt-5 capitalize">{feature.title}</h2>
                <p className="regular-16 mt-5 text-gray-30">
                  {feature.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
