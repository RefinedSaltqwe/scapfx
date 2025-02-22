import React from "react";
import Image from "next/image";
type HeroProps = {
  img?: string;
};

const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="z-5 mt-[-60px] bg-white">
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="https://live.staticflickr.com/65535/54342930437_1ec3fd1402_b.jpg"
            className="size-full object-cover"
            fill
            priority
            quality={100}
          />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-6xl font-bold tracking-tight text-white lg:text-7xl">
            Zenith
          </h1>
          <p className="mt-4 text-xl text-white">{`Preset`}</p>
        </div>
      </div>
    </div>
  );
};
export default Hero;
