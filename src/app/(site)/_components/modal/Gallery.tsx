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
};

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, setIsOpen }) => {
  const onClose = () => setIsOpen((prev) => ({ ...prev, open: false }));

  const handleImageNavigation = (direction: "prev" | "next") => {
    setIsOpen((prev) => {
      const newIdx = direction === "prev" ? prev.idx - 1 : prev.idx + 1;
      if (newIdx < 0 || newIdx >= prev.length + 1) return prev;
      return { ...prev, idx: newIdx };
    });
  };

  return (
    <Dialog open={isOpen.open} onOpenChange={onClose}>
      <DialogContent className="mb-5 border-0 bg-transparent p-0">
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
            className={`cursor-pointer p-2 ${
              isOpen.idx <= 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => handleImageNavigation("prev")}
            disabled={isOpen.idx <= 0}
          >
            Prev
          </button>
          <span className="p-2">/</span>
          <button
            className={`cursor-pointer p-2 ${
              isOpen.idx >= isOpen.length ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => handleImageNavigation("next")}
            disabled={isOpen.idx >= isOpen.length}
          >
            Next
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModal;
