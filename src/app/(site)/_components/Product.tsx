"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { presets, supportedSoftwares } from "@/data";
import { useCart } from "@/hooks/stores/useCart";
import { cn } from "@/lib/utils";
import { type Preset } from "@/types";
import React, { useMemo } from "react";
import Plan from "./Plan";

type ProductProps = {
  currentPreset: Preset;
  index: number;
};

const Product: React.FC<ProductProps> = ({ currentPreset, index }) => {
  const onOpen = useCart((state) => state.onOpen);
  const cartPresets = useCart((state) => state.presets);
  const addPreset = useCart((state) => state.addPreset);

  const isPresetExists = cartPresets.some(
    (preset) =>
      preset.productId === currentPreset.productId &&
      preset.name === currentPreset.name,
  );

  const labelNumber = useMemo(
    () => "NO. " + index.toString().padStart(2, "0"),
    [index],
  );

  return (
    <section className="mt-[-30px] flex w-full flex-col sm:flex-row">
      <div
        className={cn(
          "bg-primary relative !z-20 flex flex-1 justify-end rounded-t-md border-t-5 p-6 pb-4 sm:rounded-tl-none sm:rounded-r-md",
          currentPreset.color,
        )}
      >
        <Avatar className="border-border absolute top-[-60px] left-1/2 z-30 h-28 w-28 -translate-x-1/2 transform border-5">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="mt-8 flex max-w-2xl flex-col justify-center gap-4 sm:mt-0">
          <span className="text-primary-foreground text-sm">{labelNumber}</span>
          <span className="text-muted-foreground text-5xl font-bold uppercase">
            {currentPreset.name}
          </span>
          <p className="text-muted-foreground text-md">
            {currentPreset.description}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-6 pt-6 pb-6 sm:pt-14">
        <h3 className="text-primary text-sm font-medium">Available Packs</h3>
        <fieldset
          aria-label="Available Packs"
          className="bg-background relative max-w-2xl -space-y-px rounded-md"
        >
          {presets.map((plan, index) => (
            <Plan
              key={plan.name}
              preset={plan}
              selectedPreset={currentPreset.name}
              index={index + 1}
            />
          ))}
        </fieldset>

        <Button
          className="mt-8 h-12 max-w-2xl"
          disabled={isPresetExists}
          onClick={() => {
            addPreset(currentPreset);
            onOpen();
          }}
        >
          {isPresetExists ? "ALREADY IN THE CART" : "ADD TO CART"}
        </Button>

        <div className="border-muted mt-10 border-t pt-10">
          <h3 className="text-primary text-sm font-medium">
            Supported Softwares
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
