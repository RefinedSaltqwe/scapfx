"use client";
import CallToAction from "@/app/(site)/_components/CallToAction";
import ComparisonSlider from "@/app/(site)/_components/ComparisonSlider";
import Details from "@/app/(site)/_components/Details";
import Gallery from "@/app/(site)/_components/Gallery";
import Hero from "@/app/(site)/_components/Hero";
import Product from "@/app/(site)/_components/Product";
import Container from "@/components/Container";
import { usePresets } from "@/hooks/stores/usePresets";
import React, { lazy, useMemo } from "react";
const Loader = lazy(() => import("@/components/Loader"));

type MainPageContentProps = {
  current_preset: string;
};

const MainPageContent: React.FC<MainPageContentProps> = ({
  current_preset,
}) => {
  const allPresets = usePresets((state) => state.presets);
  const isLoading = !allPresets || allPresets.length === 0;

  // Memoized preset lookup to prevent unnecessary recalculations
  const currentPreset = useMemo(
    () => allPresets?.find((preset) => preset.name === current_preset),
    [allPresets, current_preset],
  );

  const currentPresetIndex = useMemo(
    () =>
      allPresets
        ? allPresets.findIndex((preset) => preset.name === current_preset) + 1
        : 1,
    [allPresets, current_preset],
  );

  if (isLoading || !currentPreset) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader classNames="h-8 w-8 border-3 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
      </div>
    );
  }

  // if () {
  //   return (
  //     <div className="py-10 text-center">
  //       <p className="text-muted-foreground text-lg">Preset not found.</p>
  //     </div>
  //   );
  // }

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
      <Gallery currentPreset={currentPreset} />

      <CallToAction currentPreset={currentPreset} />
    </>
  );
};
export default MainPageContent;
