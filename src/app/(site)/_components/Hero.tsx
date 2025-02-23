import React from "react";
import Image from "next/image";
import { type Preset } from "@/types";

type HeroProps = {
  currentPreset: Preset;
};

const Hero: React.FC<HeroProps> = ({ currentPreset }) => {
  return (
    <section className="bg-background relative z-5 -mt-[60px]">
      <div className="relative bg-gray-900">
        {/* Background Image */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            alt=""
            src={currentPreset.heroImg} // Use dynamic image from the preset
            className="size-full object-cover"
            width={4000}
            height={2667}
            priority
            quality={100}
          />
          {/* Bottom-to-Center Shadow Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-transparent" />
        </div>

        {/* Text Content */}
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:pt-64 sm:pb-36 lg:px-0">
          <h1 className="text-2xl font-medium tracking-tight text-white lg:text-5xl">
            {/* @scapranger */}
          </h1>
          {/* <p className="text-md text-white md:mt-2">Preset Packs</p> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
