"use client";
import CallToAction from "@/app/(site)/_components/CallToAction";
import ComparisonSlider from "@/app/(site)/_components/ComparisonSlider";
import Details from "@/app/(site)/_components/Details";
import Gallery from "@/app/(site)/_components/Gallery";
import Hero from "@/app/(site)/_components/Hero";
import Product from "@/app/(site)/_components/Product";
import Container from "@/components/Container";
import { usePresets } from "@/hooks/stores/usePresets";
import { getPresets } from "@/server/queries/fetch-presets";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";

type MainPageContentProps = {
  current_preset: string;
};

const MainPageContent: React.FC<MainPageContentProps> = ({
  current_preset,
}) => {
  const { data: allPresets } = useQuery({
    queryFn: () => getPresets(),
    queryKey: ["all_presets_"],
  });

  const addAllPresets = usePresets((state) => state.addPreset);

  useEffect(() => {
    if (allPresets) addAllPresets(allPresets);
  }, [addAllPresets, allPresets]);

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

  if (!currentPreset) return null; // Avoid errors if preset isn't found

  return (
    <>
      <Hero currentPreset={currentPreset} />
      <Product
        currentPreset={currentPreset}
        index={currentPresetIndex}
        allPresets={allPresets!}
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
