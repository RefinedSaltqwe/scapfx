import { getPresets } from "@/server/queries/fetch-presets";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import MainPageContent from "./_components/MainPageContent";

type StoreType = {
  params: {
    preset?: string;
  };
};

// ✅ Improved: Await `getPresets()` directly without Promise.all()
export async function generateMetadata({ params }: StoreType) {
  const presetName = params?.preset;

  if (!presetName) {
    return {
      title: "Preset Not Found",
      description: "No preset specified.",
    };
  }

  const presets = await getPresets();
  const currentPreset = presets.find((preset) => preset.name === presetName);

  return {
    title: currentPreset?.name ?? "Preset Not Found",
    description: currentPreset?.description ?? "No description available.",
  };
}

const Store: React.FC<StoreType> = async ({ params }) => {
  const currentPreset = params?.preset ?? "";
  const queryClient = new QueryClient();

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
