import { cn } from "@/lib/utils";
import { type Preset } from "@/types";
import { CheckIcon } from "lucide-react";
import React from "react";

const whatsIncluded = [
  {
    name: "10 Presets",
    description: "5 Desktop(.xmp) and 5 Mobile(.dng) files",
  },
  {
    name: "Preset Tools",
    description:
      "Preset Tools were built to save time and add that something extra to your images.",
  },
  { name: "RAW Files", description: "20 of my RAW files for you to edit on" },
  {
    name: "Video Tutorial",
    description:
      "Just a quick guide to help you get the most out of your preset adjustments and achieve the exact look we're going for.",
  },
  {
    name: "Camera Settings",
    description: "Tips on how to shoot. I'll show you the camera settings.",
  },
];

type DetailsProps = {
  currentPreset?: Preset;
};

const Details: React.FC<DetailsProps> = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            <p className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
              {`What's included?`}
            </p>
            <p className="text-muted-foreground mt-6 text-base/7">
              {`These presets have been fine-tuned over 1 year, making them
              perfect for anyone, whether you're just starting out or a seasoned
              pro.`}
            </p>
          </div>
          <dl className="text-muted-foreground col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 sm:grid-cols-2 lg:gap-y-16">
            {whatsIncluded.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className={"text-primary font-semibold"}>
                  <CheckIcon
                    aria-hidden="true"
                    className={cn("text-primary absolute top-1 left-0 size-5")}
                  />
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
export default Details;
