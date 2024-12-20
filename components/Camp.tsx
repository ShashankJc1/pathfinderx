"use client"; // Ensuring this is a client component

import { PEOPLE_URL } from "@/constants";
import Image from "next/image";
import { motion } from "framer-motion"; // For animations

interface CampProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
}

const CampSite = ({ title, subtitle, peopleJoined }: CampProps) => {
  return (
    <motion.div
      className="h-full w-full min-w-[1100px] bg-cover bg-no-repeat lg:rounded-r-5xl 2xl:rounded-5xl"
      style={{ backgroundImage: `url('/norway.jpg')` }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
        <div className="flexCenter gap-4">
          <div className="rounded-full bg-green-50 p-4">
            <Image src="/folded-map.svg" alt="map" width={28} height={28} />
          </div>
          <div className="flex flex-col gap-1">
            <motion.h4
              className="bold-18 text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {title}
            </motion.h4>
            <motion.p
              className="regular-14 text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        <div className="flexCenter gap-6">
          <span className="flex -space-x-4 overflow-hidden">
            {PEOPLE_URL.map((url) => (
              <Image
                className="inline-block h-10 w-10 rounded-full"
                src={url}
                key={url}
                alt="person"
                width={52}
                height={52}
              />
            ))}
          </span>
          <p className="bold-16 md:bold-20 text-white">{peopleJoined}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Camp = () => {
  return (
    <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
      <motion.div
        className="hide-scrollbar flex h-[340px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <CampSite
          backgroundImage="/norway.jpg"
          title="Tromsø"
          subtitle="Troms County, Norway"
          peopleJoined="50+ Joined"
        />
      </motion.div>

      <motion.div
        className="flexEnd mt-10 px-6 lg:-mt-60 lg:mr-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="relative w-full overflow-hidden rounded-3xl bg-white bg-opacity-30 backdrop-blur-lg p-8 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-16 xl:py-20">
          <motion.h2
            className="bold-24 md:bold-32 2xl:bold-64 capitalize text-black"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <strong>Feeling Lost</strong> And Not Knowing The Way?
          </motion.h2>
          
          <motion.p
            className="regular-14 xl:regular-16 mt-5 text-black-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ lineHeight: '1.75', maxWidth: '550px' }}
          >
            There are moments in life, where uncertainty can overwhelm us. It’s the sensation of standing at a crossroads without a clear direction, unsure of which path leads forward. Whether it’s wandering through unfamiliar places or navigating personal journeys, this feeling often brings doubt, anxiety, or hesitation. Yet, it also presents a unique opportunity: the chance to slow down, embrace discovery, ask for help, and let curiosity guide us to new experiences and destinations we never expected.
          </motion.p>
          
          <Image
            src="/quote.svg"
            alt="quote icon"
            width={186}
            height={219}
            className="absolute bottom-0 right-0"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Camp;
