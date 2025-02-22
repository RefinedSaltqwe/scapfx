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
  const onClose = () => {
    setIsOpen((prev) => ({ ...prev, open: false }));
  };
  const handleImageHovering = (i: string) => {
    if (isOpen.idx == 0 && i == "sub") return;
    if (isOpen.length == isOpen.idx && i == "add") return;

    if (i == "sub") {
      setIsOpen((prev) => ({
        ...prev,
        idx: isOpen.idx - 1,
      }));
    } else {
      setIsOpen((prev) => ({
        ...prev,
        idx: isOpen.idx + 1,
      }));
    }
  };
  return (
    <Dialog open={isOpen.open} onOpenChange={onClose}>
      <DialogContent className="mb-5 border-0 bg-transparent p-0">
        <DialogTitle className="sr-only"></DialogTitle>
        <DialogDescription className="sr-only"></DialogDescription>
        <div className="aspect-5/6 h-full w-full">
          <Image
            src={isOpen.img}
            alt=""
            fill
            className="rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="text-primary-foreground absolute -bottom-10 flex w-full flex-row justify-center gap-6">
          <span
            className="cursor-pointer p-2"
            onClick={() => handleImageHovering("sub")}
          >
            Prev
          </span>
          <span className="p-2">/</span>
          <span
            className="cursor-pointer p-2"
            onClick={() => handleImageHovering("add")}
          >
            Next
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default GalleryModal;
