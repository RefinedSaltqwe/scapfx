"use client";
import OptimizedImage from "@/components/OptimizedImage";
import { MoveHorizontal } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

type ComparisonSliderProp = {
  beforeImage: string;
  afterImage: string;
};

const ComparisonSlider: React.FC<ComparisonSliderProp> = ({
  beforeImage,
  afterImage,
}) => {
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
        className="relative mx-auto aspect-3/2 w-full max-w-[1500px] overflow-hidden rounded-md select-none"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image */}
        <OptimizedImage src={afterImage} alt="Before" />

        {/* Before Image */}
        <div
          className="absolute inset-0 overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <OptimizedImage src={beforeImage} alt="After" />
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
