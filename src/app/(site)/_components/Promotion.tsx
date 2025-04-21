import { type PresetAndChildren } from "@/types/prisma";
import React from "react";

type PromotionProps = {
  currentPreset: PresetAndChildren;
};

const Promotion: React.FC<PromotionProps> = ({ currentPreset }) => {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl pt-10 pb-16 sm:px-6 lg:px-8">
        <div className="bg-primary relative isolate overflow-hidden rounded-2xl px-6 py-16 text-center shadow-2xl sm:px-16">
          <h2 className="text-secondary text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            The Art of Shooting for the Edit
          </h2>
          <p className="text-secondary mx-auto mt-6 max-w-2xl text-lg/8 text-pretty">
            {`This pack gives you more than just presets—it includes guidance on light, settings, and shooting with intention. Because a great edit begins with a great shot. Nail the foundation, then let the preset bring it all together.`}
          </p>
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor={currentPreset.color} />
                <stop offset={1} stopColor={currentPreset.color} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Promotion;
