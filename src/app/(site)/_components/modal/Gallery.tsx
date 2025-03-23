import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

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
  const onClose = () => setIsOpen((prev) => ({ ...prev, open: false }));

  const handleImageNavigation = (direction: "prev" | "next") => {
    setIsOpen((prev) => {
      let newIdx = direction === "prev" ? prev.idx - 1 : prev.idx + 1;
      // Loop to last image:
      // If index is less than -1 then set the index of the last image's index
      if (newIdx < 0) newIdx = prev.length;
      // Loop to first image:
      // If index is greater than the number of the last image's index then set the index of the first image's index
      if (newIdx > prev.length) newIdx = 0;
      return { ...prev, idx: newIdx, img: gallery[newIdx] ?? "#" };
    });
  };

  return (
    <Dialog open={isOpen.open} onOpenChange={onClose}>
      <DialogContent className="mb-5 w-full border-0 bg-transparent p-0 sm:!max-w-xl lg:!max-w-3xl">
        <DialogTitle className="sr-only">{isOpen.idx}</DialogTitle>
        <DialogDescription className="sr-only">{isOpen.idx}</DialogDescription>
        <div className="relative aspect-5/6 h-full w-full">
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
