import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";

type GalleryModalProps = {
  isOpen: {
    open: boolean;
    img: string;
    idx: number;
    length: number;
  };
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      img: string;
      idx: number;
      length: number;
    }>
  >;
  gallery: string[];
};

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  setIsOpen,
  gallery,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const onClose = () => setIsOpen((prev) => ({ ...prev, open: false }));

  const handleImageNavigation = (direction: "prev" | "next") => {
    setIsOpen((prev) => {
      let newIdx = direction === "prev" ? prev.idx - 1 : prev.idx + 1;
      if (newIdx < 0) newIdx = prev.length - 1; // Loop to last image
      if (newIdx >= prev.length) newIdx = 0; // Loop to first image
      return { ...prev, idx: newIdx, img: gallery[newIdx] ?? "#" };
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches?.[0];
    if (touch) {
      setTouchStartX(touch.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches?.[0];
    if (touch) {
      setTouchEndX(touch.clientX);
    }
  };
  // Handle touch end (detect swipe direction)
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (diff > 50) handleImageNavigation("next"); // Swipe left → Next
      if (diff < -50) handleImageNavigation("prev"); // Swipe right → Prev
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <Dialog open={isOpen.open} onOpenChange={onClose}>
      <DialogContent className="mb-5 w-full border-0 bg-transparent p-0 sm:!max-w-xl lg:!max-w-3xl">
        <DialogTitle className="sr-only">{isOpen.idx}</DialogTitle>
        <DialogDescription className="sr-only">{isOpen.idx}</DialogDescription>
        <div
          className="relative aspect-5/6 h-full w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={isOpen.img}
            alt="Gallery Image"
            fill
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="text-primary-foreground absolute -bottom-10 flex w-full flex-row justify-center gap-6">
          <button
            className="cursor-pointer p-2"
            onClick={() => handleImageNavigation("prev")}
          >
            Prev
          </button>
          <span className="p-2">/</span>
          <button
            className="cursor-pointer p-2"
            onClick={() => handleImageNavigation("next")}
          >
            Next
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
