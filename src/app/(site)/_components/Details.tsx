import React from "react";

const whatsIncluded = [
  {
    name: "Desktop and Mobile Presets",
    description: "11 Presets in .xmp and .dng format",
  },
  {
    name: "Preset Tools",
    description:
      "Preset Tools were built to save time and add that something extra to your images.",
  },
  { name: "Raw Photos", description: "I have included 10 Raw Photos." },
  {
    name: "Video Tutorial",
    description: "See exactly how I use these presets to get the look.",
  },
];

type DetailsProps = {
  x?: string;
};

const Details: React.FC<DetailsProps> = () => {
  return (
    <div className="bg-background pt-10">
      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
            {`What's included?`}
          </h2>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {whatsIncluded.map((feature) => (
            <div key={feature.name} className="border-muted border-t pt-4">
              <dt className="text-primary text-sm font-medium">
                {feature.name}
              </dt>
              <dd className="text-muted-foreground mt-2 text-sm">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
        <div className="border-muted mt-10 border-t pt-10 text-center">
          <p className="text-muted-foreground text-md">{`I have designed these presets to work on images from Canon, Sony,
            Nikon, Panasonic and Fuji cameras and have tested on multiple mobile
            & drone camera files. The presets work on both Lightroom Desktop and
            the Lightroom Mobile app, including all previous Lightroom versions,
            as well as Adobe Photoshop Camera Raw.`}</p>
        </div>
      </div>
    </div>
  );
};
export default Details;
