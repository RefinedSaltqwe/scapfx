import { whatsIncluded } from "@/data";
import { cn } from "@/lib/utils";
import { type PresetAndChildren } from "@/types/prisma";
import { CheckIcon } from "lucide-react";
import React from "react";

type DetailsProps = {
  currentPreset?: PresetAndChildren;
};

const Details: React.FC<DetailsProps> = () => {
  return (
    <div className="bg-background py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            <p className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
              {`What's included?`}
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
