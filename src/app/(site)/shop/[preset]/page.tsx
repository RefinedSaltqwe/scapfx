import { getPresets } from "@/server/queries/fetch-presets";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import MainPageContent from "./_components/MainPageContent";
import { type Preset } from "@/types";

type StoreType = {
  params: {
    preset?: string;
  };
};

// In-memory cache for presets to avoid repeated fetches
let presetsCache: Preset[] | null = null;
let lastFetched = 0;
const CACHE_TTL = 5 * 60 * 1000; // Cache TTL: 5 minutes

// ✅ Improved: Await `getPresets()` directly without Promise.all()
export async function generateMetadata({ params }: StoreType) {
  const presetName = params?.preset;

  if (!presetName) {
    return {
      title: "Preset Not Found",
      description: "No preset specified.",
    };
  }

  const currentTime = Date.now();

  // Check if cached presets exist and are still fresh
  if (presetsCache && currentTime - lastFetched < CACHE_TTL) {
    // Use cached data if it's fresh
    const currentPreset = presetsCache.find(
      (preset) => preset.name === presetName,
    );
    return {
      title: currentPreset?.name ?? "Preset Not Found",
      description: currentPreset?.description ?? "No description available.",
    };
  }

  // Fetch presets if not cached or cache expired
  const presets = await getPresets();
  presetsCache = presets; // Cache the fetched data
  lastFetched = currentTime; // Update last fetched time

  const currentPreset = presets.find((preset) => preset.name === presetName);

  return {
    title: currentPreset?.name ?? "Preset Not Found",
    description: currentPreset?.description ?? "No description available.",
  };
}

const Store: React.FC<StoreType> = async ({ params }) => {
  const currentPreset = params?.preset ?? "";
  const queryClient = new QueryClient();

  // Pre-fetch presets data once and store it in the queryClient cache
  await queryClient.prefetchQuery({
    queryFn: getPresets,
    queryKey: ["all_presets_"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPageContent current_preset={currentPreset} />
    </HydrationBoundary>
  );
};

export default Store;
