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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="size-full object-cover"
            fill
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/10" /> {/* Overlay */}
        </div>

        {/* Text Content */}
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
            @scapranger
          </h1>
          <p className="mt-4 text-lg text-white">Preset Packs</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
