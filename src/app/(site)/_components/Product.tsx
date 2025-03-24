"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supportedSoftwares } from "@/data";
import { useCart } from "@/hooks/stores/useCartStore";
import { useLoggedUser } from "@/hooks/stores/useLoggedUserStore";
import React, { useMemo } from "react";
import Plan from "./Plan";
import { type PresetAndChildren } from "@/types/prisma";
import { trackEvent } from "@/lib/fbpixels";
import { siteConfig } from "config/site";
import { env } from "@/env";

type ProductProps = {
  currentPreset: PresetAndChildren;
  index: number;
  allPresets: PresetAndChildren[];
};

const Product: React.FC<ProductProps> = ({
  currentPreset,
  index,
  allPresets,
}) => {
  const onOpen = useCart((state) => state.onOpen);
  const cartPresets = useCart((state) => state.presets);
  const addPreset = useCart((state) => state.addPreset);
  const ownedPresets = useLoggedUser((state) => state.ownedPresets);

  // Memoize the border color and text color styles to avoid unnecessary recalculations
  const borderColorStyle = useMemo(
    () => ({ borderColor: currentPreset.color }),
    [currentPreset.color],
  );
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

  const labelNumber = useMemo(
    () => "NO. " + index.toString().padStart(2, "0"),
    [index],
  );

  return (
    <section className="mt-[-30px] flex w-full flex-col md:flex-row">
      <div
        className="bg-primary relative !z-20 flex flex-1 justify-end border-t-5 p-6 sm:rounded-tl-none sm:rounded-r-md"
        style={borderColorStyle}
      >
        <Avatar
          className="absolute top-[-60px] left-1/2 z-30 h-28 w-28 -translate-x-1/2 transform border-5"
          style={borderColorStyle}
        >
          <AvatarImage
            src="https://live.staticflickr.com/65535/54344995695_1dd728d26d_b.jpg"
            alt="author's image"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="mt-8 flex max-w-2xl flex-col justify-center gap-4 sm:mt-0">
          <span className="text-muted/85 text-sm">{labelNumber}</span>
          <span
            className="text-muted-foreground text-5xl font-bold uppercase"
            style={textColorStyle}
          >
            {currentPreset.name}
          </span>
          <p className="text-muted/85 text-md">{currentPreset.description}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:pt-14">
        <h3 className="text-primary text-sm font-medium">Available Packs</h3>
        <fieldset
          aria-label="Available Packs"
          className="bg-background relative max-w-2xl -space-y-px rounded-md"
        >
          {allPresets.map((plan, index) => (
            <Plan
              key={plan.name}
              preset={plan}
              selectedPreset={currentPreset.id}
              index={index + 1}
            />
          ))}
        </fieldset>

        <Button
          className="mt-8 h-12 max-w-2xl"
          disabled={isPresetExists || isPresetOwned}
          onClick={() => {
            // Handle the promise rejection gracefully
            trackEvent("AddToCart", {
              value: currentPreset.price,
              currency: siteConfig.currency,
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

        <div className="border-muted mt-10 border-t pt-10">
          <h3 className="text-primary font-medium">
            {`Buy 3, Get an Extra ${env.NEXT_PUBLIC_STRIPE_DISCOUNT}% Off!`}
          </h3>
          <h3 className="text-primary mt-6 text-sm font-medium">
            Supported Software
          </h3>
          <div className="mt-4">
            <ul
              role="list"
              className="text-muted-foreground marker:text-muted-foreground list-disc space-y-1 pl-5 text-sm/6"
            >
              {supportedSoftwares.map((highlight) => (
                <li key={highlight} className="pl-2">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
