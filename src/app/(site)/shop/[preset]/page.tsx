import Container from "@/components/Container";
import { presets } from "@/data";
import { defaultPreset } from "@/data/default";
import { type Preset } from "@/types";
import React from "react";
import ComparisonSlider from "../../_components/ComparisonSlider";
import Details from "../../_components/Details";
import Gallery from "../../_components/Gallery";
import Hero from "../../_components/Hero";
import Product from "../../_components/Product";
import CallToAction from "../../_components/CallToAction";

type StoreType = {
  params: {
    preset: string;
  };
};

// Optimized `generateMetadata`
export async function generateMetadata({ params }: StoreType) {
  const currentPreset = presets.find((preset) => preset.name === params.preset);

  return {
    title: currentPreset?.name ?? "Preset Not Found",
    description:
      currentPreset?.description ?? "No description available for this preset.",
  };
}

const Store: React.FC<StoreType> = ({ params }) => {
  // Optimized preset lookup
  const currentPreset: Preset =
    presets.find((preset) => preset.name === params.preset) ?? defaultPreset;

  const currentPresetIndex =
    presets.findIndex((preset) => preset.name === params.preset) + 1;

  return (
    <>
      <Hero currentPreset={currentPreset} />
      <Product currentPreset={currentPreset} index={currentPresetIndex} />

      <Container maxWidth="full" bgColor="bg-secondary">
        <div className="flex w-full flex-col items-center">
          <div className="mx-auto my-16 max-w-2xl text-center lg:max-w-4xl">
            <h2 className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
              What you can expect your photos to look like when using my
              presets.
            </h2>
            <p className="text-muted-foreground mt-4">
              {`They're designed to work across different photography
              styles—landscapes, portraits, night scenes, and urban
              environments. I consistently use them in my
              projects.`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-10 lg:grid-cols-2">
          {currentPreset.beforeAfterImages.map((group, index) => (
            <ComparisonSlider
              key={index}
              beforeImage={group.beforeImage}
              afterImage={group.afterImage}
            />
          ))}
        </div>
      </Container>

      <Container maxWidth="lg">
        <Details />
      </Container>

      <CallToAction currentPreset={currentPreset} />

      <Container maxWidth="lg">
        <Gallery currentPreset={currentPreset} />
      </Container>
    </>
  );
};

export default Store;
