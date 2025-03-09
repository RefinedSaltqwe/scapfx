"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/stores/useCart";
import { type PresetAndChildren } from "@/types/prisma";
import React, { useMemo } from "react";

type CallToActionProps = {
  currentPreset: PresetAndChildren;
};

const CallToAction: React.FC<CallToActionProps> = ({ currentPreset }) => {
  const onOpen = useCart((state) => state.onOpen);
  const cartPresets = useCart((state) => state.presets);
  const addPreset = useCart((state) => state.addPreset);

  // Memoize the text color style to avoid recalculating on every render
  const textColorStyle = useMemo(
    () => ({ color: currentPreset.color }),
    [currentPreset.color],
  );

  // Check if the preset already exists in the cart
  const isPresetExists = useMemo(
    () =>
      cartPresets.some(
        (preset) =>
          preset.productId === currentPreset.productId &&
          preset.name === currentPreset.name,
      ),
    [cartPresets, currentPreset],
  );
  return (
    <div className="bg-primary relative isolate overflow-hidden">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
            style={textColorStyle}
          >
            Elevate your edits in just a few clicks.
          </h2>
          <p className="text-secondary mx-auto mt-6 max-w-xl text-lg/8 text-pretty">
            {`These presets have been fine-tuned for over 1 year, making them perfect
            for anyone, whether you're just starting out or a seasoned pro.`}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              className="mt-8 h-12 w-full max-w-sm"
              variant={"secondary"}
              disabled={isPresetExists}
              onClick={() => {
                addPreset(currentPreset);
                onOpen();
              }}
            >
              {isPresetExists ? "ALREADY IN THE CART" : "ADD TO CART"}
            </Button>
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
      >
        <circle
          r={512}
          cx={512}
          cy={512}
          fill="url(#gradient)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="gradient">
            <stop stopColor={currentPreset.color} />
            <stop offset={1} stopColor={currentPreset.color} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
export default CallToAction;
