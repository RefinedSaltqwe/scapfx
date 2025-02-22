"use client";
import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState, useCallback, useEffect, useRef } from "react";

const ComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const newX = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const newPosition = (newX / rect.width) * 100;
    setSliderPosition((prev) => (prev !== newPosition ? newPosition : prev));
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) return;
      updateSliderPosition(event.clientX);
    },
    [isDragging, updateSliderPosition],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isDragging) return;
      updateSliderPosition(event.touches[0]!.clientX);
    },
    [isDragging, updateSliderPosition],
  );

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <div className="relative w-full">
      <div
        ref={sliderRef}
        className="relative mx-auto aspect-[80/45] w-full max-w-[700px] overflow-hidden rounded-md select-none"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Before Image */}
        <Image
          alt="Before"
          fill
          draggable={false}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src="https://images.unsplash.com/photo-1523435324848-a7a613898152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
        />

        {/* After Image */}
        <div
          className="absolute inset-0 overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            fill
            priority
            draggable={false}
            alt="After"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src="https://images.unsplash.com/photo-1598875791852-8bb153e713f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2010&q=80"
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute inset-y-0 w-[1px] cursor-ew-resize bg-white/75"
          style={{ left: `calc(${sliderPosition}% - 1px)` }}
        >
          <div className="absolute top-1/2 left-[-1.75rem] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/75 bg-white/10 backdrop-blur-sm">
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
