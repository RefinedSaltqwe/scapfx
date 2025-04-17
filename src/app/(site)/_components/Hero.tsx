import React from "react";
import Image from "next/image";
import { type PresetAndChildren } from "@/types/prisma";

type HeroProps = {
  currentPreset: PresetAndChildren;
};

const Hero: React.FC<HeroProps> = ({ currentPreset }) => {
  return (
    <section className="bg-background relative z-5 -mt-[56px]">
      <div className="relative bg-gray-900">
        {/* Preload Hero Image */}
        <link
          rel="preload"
          href={currentPreset.heroImg}
          as="image"
          type="image/webp"
          media="(max-width: 1200px)"
        />
        <link
          rel="preload"
          href={currentPreset.heroImg}
          as="image"
          type="image/webp"
          media="(min-width: 1201px)"
        />

        {/* Background Image */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            alt="Preset Hero Image"
            src={currentPreset.heroImg} // Ensure it's a WebP image if available
            className="size-full object-cover"
            width={1920} // Adjust width to a reasonable value based on your design
            height={1280} // Adjust height accordingly
            priority
            quality={85} // Slightly reduce quality for better performance
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 80vw, 50vw" // Use appropriate sizes
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
