"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GalleryModal from "../modal/Gallery";
import { presets } from "@/data";
import { type Preset } from "@/types";

type GalleryProps = {
  currentPreset: Preset;
};

const Gallery: React.FC<GalleryProps> = ({ currentPreset }) => {
  const [isOpen, setIsOpen] = useState({
    open: false,
    img: "#",
    idx: 0,
    length: currentPreset.gallery.length - 1,
  });

  useEffect(() => {
    setIsOpen((prev) => ({
      ...prev,
      img: currentPreset.gallery[isOpen.idx] ?? "",
    }));
  }, [currentPreset.gallery, isOpen.idx]);

  return (
    <>
      <GalleryModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex w-full flex-col">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
            {`Gallery`}
          </h2>
        </div>
        <div className="my-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {presets[0]!.gallery.map((img, index) => (
            <div
              key={index}
              className="relative aspect-5/6 cursor-pointer"
              onClick={() =>
                setIsOpen((prev) => ({
                  ...prev,
                  open: true,
                  img: img,
                  idx: index,
                }))
              }
            >
              <Image
                src={img}
                alt=""
                fill
                className="rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Gallery;
