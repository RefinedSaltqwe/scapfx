"use client";
import Details from "@/app/(site)/_components/Details";
import Hero from "@/app/(site)/_components/Hero";
import Product from "@/app/(site)/_components/Product";
import Container from "@/components/Container";
import Loader from "@/components/Loader";
import { usePresets } from "@/hooks/stores/usePresetsStore";
import dynamic from "next/dynamic";
import React from "react";
const LazyGallery = dynamic(() => import("@/app/(site)/_components/Gallery"), {
  ssr: false,
});
const LazyCallToAction = dynamic(
  () => import("@/app/(site)/_components/CallToAction"),
  { ssr: false },
);
const LazyComparisonSlider = dynamic(
  () => import("@/app/(site)/_components/ComparisonSlider"),
  { ssr: false },
);

type MainPageContentProps = {
  current_preset: string;
};

const MainPageContent: React.FC<MainPageContentProps> = ({
  current_preset,
}) => {
  const allPresets = usePresets((state) => state.presets);
  const isLoading = !allPresets || allPresets.length === 0;

  // Find the current preset
  const currentPreset =
    allPresets?.find((preset) => preset.id === current_preset) ?? null;
  const currentPresetIndex = currentPreset
    ? allPresets.findIndex((preset) => preset.id === current_preset) + 1
    : 1;

  // If loading, show loader
  if (isLoading || !currentPreset) {
    return (
      <div className="flex h-[85vh] items-center justify-center">
        <Loader classNames="h-8 w-8 border-3 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
      </div>
    );
  }

  return (
    <>
      <Hero currentPreset={currentPreset} />
      <Product
        currentPreset={currentPreset}
        index={currentPresetIndex}
        allPresets={allPresets}
      />

      <Container maxWidth="full" bgColor="bg-secondary">
        <div className="flex w-full flex-col items-center">
          <div className="mx-auto my-16 max-w-2xl text-center lg:max-w-4xl">
            <h2 className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
              What you can expect your photos to look like when using my
              presets.
            </h2>
            <p className="text-muted-foreground mt-4">
              {`They're designed to work across different photography styles—landscapes, portraits, night scenes, and urban environments. I consistently use them in my projects.`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pb-10 lg:grid-cols-2">
          {currentPreset?.beforeAfterImages?.map((group, index) => (
            <LazyComparisonSlider
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
      <LazyGallery currentPreset={currentPreset} />
      <LazyCallToAction currentPreset={currentPreset} />
    </>
  );
};

export default MainPageContent;
