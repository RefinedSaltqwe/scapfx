"use client";
import Hero from "@/app/(site)/_components/Hero";
import Product from "@/app/(site)/_components/Product";
import Promotion from "@/app/(site)/_components/Promotion";
import { usePresets } from "@/hooks/stores/usePresetsStore";
import { getPresetById } from "@/server/queries/fetch-preset";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const LazyGallery = dynamic(() => import("@/app/(site)/_components/Gallery"), {
  ssr: false,
});
const Details = dynamic(() => import("@/app/(site)/_components/Details"), {
  ssr: false,
});
const Container = dynamic(() => import("@/components/Container"), {
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
const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });

type MainPageContentProps = {
  current_preset: string;
};

const MainPageContent: React.FC<MainPageContentProps> = ({
  current_preset,
}) => {
  const allPresets = usePresets((state) => state.presets);
  const addPreset = usePresets((state) => state.addPreset);
  const presetNav = usePresets((state) => state.presetNav);
  const isLoading = !allPresets || allPresets.length === 0;

  const presetExists = allPresets.some(
    (existingPreset) => existingPreset.id === current_preset,
  );

  const currentPreset =
    allPresets?.find((preset) => preset.id === current_preset) ?? null;

  const currentPresetIndex = currentPreset
    ? presetNav.findIndex((preset) => preset.id === current_preset) + 1
    : 1;

  const {
    data: presetData,
    isLoading: presetsLoading,
    isError: presetsError,
  } = useQuery({
    queryFn: () => getPresetById(current_preset),
    queryKey: ["get_preset_by_id", current_preset],
    staleTime: 300_000, // 5 minutes
    gcTime: 300_000, // 5 minutes
    enabled: !!current_preset && !presetExists,
  });

  useEffect(() => {
    if (!presetsLoading && !presetsError && presetData && !presetExists) {
      addPreset(presetData);
    }
  }, [presetsLoading, presetsError, presetData, presetExists, addPreset]);

  // If loading, show loader
  if (isLoading || !currentPreset) {
    return (
      <div className="flex h-[85vh] items-center justify-center">
        <Loader classNames="h-8 w-8 border-3 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
      </div>
    );
  }

  if (presetsError) {
    return (
      <div className="flex h-[85vh] items-center justify-center">
        <p className="text-red-500">Failed to load preset. Please refresh.</p>
      </div>
    );
  }

  return (
    <>
      {/* <NewsLetterProvider /> */}
      <Hero currentPreset={currentPreset} />
      <Product
        currentPreset={currentPreset}
        index={currentPresetIndex}
        allPresets={presetNav}
      />
      <Container maxWidth="full" bgColor="bg-secondary">
        <div className="flex w-full flex-col items-center">
          <div className="mx-auto my-16 max-w-2xl text-center lg:max-w-4xl">
            <h2 className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
              The results you can expect.
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
        <Promotion currentPreset={currentPreset} />
        <Details />
      </Container>
      <LazyGallery currentPreset={currentPreset} />
      <LazyCallToAction currentPreset={currentPreset} />
    </>
  );
};

export default MainPageContent;
