"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@headlessui/react";
import { type Gallery } from "@prisma/client";
import { siteConfig } from "config/site";
import { Trash2 } from "lucide-react";
import React, { memo } from "react";
import Image from "next/image";
import { isImageUrl } from "@/lib/utils";
import { toast } from "sonner";

type GalleryInputProps = {
  data: Gallery;
  index: number;
  count: number;
  setGalleryImages: React.Dispatch<React.SetStateAction<Gallery[]>>;
};

const GalleryInput: React.FC<GalleryInputProps> = ({
  data,
  index,
  count,
  setGalleryImages,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1">
        <Input
          type="text"
          onFocus={(e) => e.target.select()}
          id={`after` + index}
          value={data.link}
          onChange={(e) => {
            if (isImageUrl(e.target.value)) {
              setGalleryImages((prev) => [
                ...prev.map((item, idx) =>
                  index === idx
                    ? {
                        ...item,
                        link: e.target.value,
                      }
                    : item,
                ),
              ]);
            } else {
              toast.error("Invalid image url");
            }
          }}
          autoComplete="after"
          placeholder="Image Link"
          className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
        />
      </div>

      <Image
        alt=""
        src={data.link !== "" ? data.link : siteConfig.defaultProductImage}
        className="size-24 flex-none rounded-lg bg-gray-800 object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        width={24}
        height={24}
      />
      <div className="flex items-center justify-between">
        <span>{data.sequence}</span>
        <Button
          type="button"
          className="hover:!bg-destructive/20 rounded-full"
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setGalleryImages((prev) => [
              ...prev.filter((item, idx) => index !== idx),
            ]);
          }}
          disabled={count == 1 && index == 0}
        >
          <span className="sr-only">Delete Service</span>
          <Trash2 className="text-destructive" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default memo(GalleryInput, (prevProps, nextProps) => {
  return (
    prevProps.data.link === nextProps.data.link &&
    prevProps.index === nextProps.index &&
    prevProps.count === nextProps.count
  );
});
