"use client";

import { FEATURES } from "@/constants";
import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24">
      <div className="max-container padding-container relative flex flex-col-reverse lg:flex-row items-center justify-between">
        
        {/* Phone Image Section */}
        <div className="relative flex-1 flexCenter h-auto">
          <div className="relative w-[100%] max-w-[600px] aspect-[9/19] lg:w-[100%] lg:max-w-[800px]">
            <Image
              src="/phone.png"
              alt="phone"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>

        {/* Features List Section */}
        <div className="z-20 flex flex-col flex-1 lg:w-[60%] text-center lg:text-left">
          <h2 className="bold-40 lg:bold-64 mb-6">Our Features</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-20">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex flex-col items-start">
                <div className="rounded-full p-4 lg:p-7 bg-green-50">
                  <Image src={feature.icon} alt={feature.title} width={28} height={28} />
                </div>
                <h2 className="bold-20 lg:bold-32 mt-5 capitalize">{feature.title}</h2>
                <p className="regular-16 mt-5 text-gray-30">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;
