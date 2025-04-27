import React from "react";
import Image from "next/image";
import { type PresetAndChildren } from "@/types/prisma";
import Head from "next/head";

type HeroProps = {
  currentPreset: PresetAndChildren;
};

const Hero: React.FC<HeroProps> = ({ currentPreset }) => {
  const imageSrc = currentPreset.heroImg || "default-fallback.webp";

  return (
    <section className="bg-background relative z-5 -mt-[56px]">
      <div className="relative bg-gray-900">
        {/* Preload Hero Image */}
        <Head>
          <link
            rel="preload"
            as="image"
            href={`/assets/images/preset-hero/${imageSrc}`}
            type="image/webp"
          />
        </Head>

        {/* Full-Width Background Image */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            alt={`Hero image for preset: ${currentPreset.name}`}
            src={`/assets/images/preset-hero/${imageSrc}`}
            className="size-full object-cover"
            width={1920} // Adjust based on your design (larger is fine for hero images)
            height={1280} // Make sure the height ratio matches
            priority
            quality={75}
            sizes="100vw" // Full width of the viewport
          />
          {/* Bottom-to-Center Shadow Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-transparent" />
        </div>

        {/* Text Content */}
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:pt-64 sm:pb-36 lg:px-0">
          <h1 className="text-2xl font-medium tracking-tight text-white lg:text-5xl">
            {/* @scapranger */}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
