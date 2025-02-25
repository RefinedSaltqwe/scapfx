"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type OptimizedImageProp = {
  src: string;
  alt: string;
};

const OptimizedImage: React.FC<OptimizedImageProp> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Image
      src={src}
      alt={alt}
      width={1500}
      height={1000}
      loading="lazy"
      quality={100}
      draggable={false}
      className={loaded ? "opacity-100 transition-all" : "opacity-0"}
    />
  );
};

export default OptimizedImage;
