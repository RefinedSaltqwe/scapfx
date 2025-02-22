"use client";
import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type ComparisonSliderProps = {
  x?: string;
};

const ComparisonSlider: React.FC<ComparisonSliderProps> = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointer = (
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDragging) return;
    let x,
      percent = 0;
    const rect = event.currentTarget.getBoundingClientRect();

    if ("touches" in event) {
      x = Math.max(
        0,
        Math.min(event.touches[0]!.clientX - rect.left, rect.width),
      );
    } else {
      x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    }

    percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div className="relative w-full" onMouseUp={handleMouseUp}>
      <div
        className="relative m-auto aspect-[80/45] w-full max-w-[700px] overflow-hidden rounded-md select-none"
        onMouseMove={handlePointer}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchMove={handlePointer}
        onTouchEnd={handleMouseUp}
        onTouchCancel={handleMouseUp}
      >
        <Image
          alt=""
          fill
          draggable={false}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="https://images.unsplash.com/photo-1523435324848-a7a613898152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
        />

        <div
          className="absolute top-0 right-0 left-0 m-auto aspect-[80/45] w-full max-w-[700px] overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            fill
            priority
            draggable={false}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="https://images.unsplash.com/photo-1598875791852-8bb153e713f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2010&q=80"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-[1px] cursor-ew-resize bg-white/75"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="absolute top-[calc(50%-25px)] -left-7 flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-white/75 bg-white/10 backdrop-blur-sm">
            <MoveHorizontal
              width={32}
              height={32}
              className="text-background stroke-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComparisonSlider;
