"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GalleryModal from "../modal/Gallery";

type GalleryProps = {
  x?: string;
};

const images = [
  "https://images.squarespace-cdn.com/content/v1/59d35bfce9bfdfb1a70b1529/1569231867978-INAU0MFALE723LPQYT00/bledOR.jpg?format=1500w",
  ,
  "https://instagram.fyxe2-1.fna.fbcdn.net/v/t51.2885-15/478555734_18149104981364512_512425539512160075_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmY3NTc2MS5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fyxe2-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2AEwXb157x-4hieB0sm7VMZ4bEBIKBxYmXIGWrOB1mXZWdcd1u_PXLpEndXEvhk9VM4&_nc_ohc=Mpdu_Jruz2cQ7kNvgFGo5gw&_nc_gid=c3b8942cc98c4e4a8f3c2185cd6bc059&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzU2NjY4MTczMzAzOTk1NTE1NQ%3D%3D.3-ccb7-5&oh=00_AYAjmYXD7zfkhc2kykBFEK_5g7fm2CAZ_5CP0zaLre4RTQ&oe=67BF213A&_nc_sid=7a9f4b",
  "https://instagram.fyxe2-1.fna.fbcdn.net/v/t51.2885-15/475493616_18149105005364512_1152647364899255075_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmY3NTc2MS5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fyxe2-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2AEwXb157x-4hieB0sm7VMZ4bEBIKBxYmXIGWrOB1mXZWdcd1u_PXLpEndXEvhk9VM4&_nc_ohc=GjnEqVGscmMQ7kNvgH0ZGQk&_nc_gid=c3b8942cc98c4e4a8f3c2185cd6bc059&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzU2NjY4MTczMzAzMTYwMTg4MQ%3D%3D.3-ccb7-5&oh=00_AYDFsZxJ3rIl4kXJ7xTHyQmPD9NrTFgazelQisrYdJ4cuQ&oe=67BF2665&_nc_sid=7a9f4b",
  "https://instagram.fyxe2-1.fna.fbcdn.net/v/t51.2885-15/476504257_18148911247364512_1372799456809506077_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmY3NTc2MS5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fyxe2-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2AEwXb157x-4hieB0sm7VMZ4bEBIKBxYmXIGWrOB1mXZWdcd1u_PXLpEndXEvhk9VM4&_nc_ohc=56GC0zVGn_0Q7kNvgG5bNiu&_nc_gid=c3b8942cc98c4e4a8f3c2185cd6bc059&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzU2NTIzODE5MDU3MzM1NTE3OQ%3D%3D.3-ccb7-5&oh=00_AYDDP-xIwRAITxfcmooKAa2ztVkRG8Vju1Z0bcV4hMoi0w&oe=67BF0094&_nc_sid=7a9f4b",
  "https://instagram.fyxe2-1.fna.fbcdn.net/v/t51.2885-15/476667060_18148699324364512_2263682378816001811_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmY3NTc2MS5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fyxe2-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2AEwXb157x-4hieB0sm7VMZ4bEBIKBxYmXIGWrOB1mXZWdcd1u_PXLpEndXEvhk9VM4&_nc_ohc=cOEZq1O0rSsQ7kNvgEVoE-2&_nc_gid=c3b8942cc98c4e4a8f3c2185cd6bc059&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzU2MzY5MzU2OTY3NDQ5Njg0NA%3D%3D.3-ccb7-5&oh=00_AYD6cWFKQHWYxL7M51QyJuPYk47IiCIMkbDv19R2CvAXcw&oe=67BEFF85&_nc_sid=7a9f4b",
];

const Gallery: React.FC<GalleryProps> = () => {
  const [isOpen, setIsOpen] = useState({
    open: false,
    img: "#",
    idx: 0,
    length: images.length - 1,
  });

  useEffect(() => {
    setIsOpen((prev) => ({ ...prev, img: images[isOpen.idx] ?? "" }));
  }, [isOpen.idx]);

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
          {images.map((img, index) => (
            <div
              key={index}
              className="relative aspect-5/6 cursor-pointer"
              onClick={() =>
                setIsOpen((prev) => ({
                  ...prev,
                  open: true,
                  img: img!,
                  idx: index,
                }))
              }
            >
              <Image
                src={img!}
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
