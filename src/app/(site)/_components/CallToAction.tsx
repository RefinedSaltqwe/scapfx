"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/stores/useCartStore";
import { useLoggedUser } from "@/hooks/stores/useLoggedUserStore";
import { trackEvent } from "@/lib/fbpixels";
import { type PresetAndChildren } from "@/types/prisma";
import { siteConfig } from "config/site";
import React, { useMemo } from "react";

type CallToActionProps = {
  currentPreset: PresetAndChildren;
};

const CallToAction: React.FC<CallToActionProps> = ({ currentPreset }) => {
  const onOpen = useCart((state) => state.onOpen);
  const cartPresets = useCart((state) => state.presets);
  const addPreset = useCart((state) => state.addPreset);
  const ownedPresets = useLoggedUser((state) => state.ownedPresets);

  // Memoize the text color style to avoid recalculating on every render
  const textColorStyle = useMemo(
    () => ({ color: currentPreset.color }),
    [currentPreset.color],
  );

  // Check if preset is already owned by the user
  const isPresetOwned = useMemo(
    () => ownedPresets.includes(currentPreset.id),
    [ownedPresets, currentPreset.id],
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
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-secondary text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
            style={textColorStyle}
          >
            Presets Are Powerful — With the Right Process
          </h2>
          <p className="text-secondary mx-auto mt-6 max-w-2xl text-lg/8 text-pretty">
            {`Most presets fall flat—not because they're bad, but because no one teaches you how to shoot for them. Without a clear understanding of light, settings, and intentional shooting, even the best presets can miss the mark.`}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              className="mt-8 h-12 w-full max-w-sm"
              variant={"secondary"}
              disabled={isPresetExists || isPresetOwned}
              onClick={() => {
                trackEvent("AddToCart", {
                  event_source_url: window.location.href,
                  user_agent: navigator.userAgent,
                  value: currentPreset.price,
                  currency: siteConfig.currency,
                  content_ids: [currentPreset.id],
                  content_name: currentPreset.name,
                  content_type: "product",
                }).catch((error) =>
                  console.error("Error tracking AddToCart event:", error),
                );
                addPreset(currentPreset);
                onOpen();
              }}
            >
              {isPresetExists
                ? "IN CART"
                : isPresetOwned
                  ? "ALREADY OWNED"
                  : "ADD TO CART"}
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
