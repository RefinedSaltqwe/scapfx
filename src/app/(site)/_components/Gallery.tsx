"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GalleryModal from "./modal/Gallery";
import { presets } from "@/data";
import { type Preset } from "@/types";

type GalleryProps = {
  currentPreset: Preset;
};

const Gallery: React.FC<GalleryProps> = ({ currentPreset }) => {
  const [isOpen, setIsOpen] = useState({
    open: false,
    img: currentPreset.gallery[0] ?? "#",
    idx: 0,
    length: currentPreset.gallery.length - 1,
  });

  useEffect(() => {
    setIsOpen((prev) => ({
      ...prev,
      img: currentPreset.gallery[isOpen.idx] ?? "#",
    }));
  }, [currentPreset.gallery, isOpen.idx]);

  return (
    <div className="bg-background mx-auto w-full p-0.5">
      <GalleryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        gallery={currentPreset.gallery}
      />
      <div className="mt-7 flex w-full flex-col">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
            {`Gallery`}
          </h2>
        </div>
        <div className="my-10 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {presets[0]!.gallery.map((img, index) => (
            <div
              key={index}
              className="relative aspect-5/6 cursor-pointer"
              onClick={() =>
                setIsOpen({
                  open: true,
                  img: img,
                  idx: index,
                  length: currentPreset.gallery.length - 1,
                })
              }
            >
              <Image
                src={img}
                alt=""
                fill
                className="rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Gallery;
