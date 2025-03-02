import { getPresets } from "@/server/queries/fetch-presets";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import MainPageContent from "./_components/MainPageContent";
import getServerSession from "next-auth";
import { authConfig } from "@/server/auth/config";

type StoreType = {
  params: {
    preset: string;
  };
};

// ✅ Fix: Await `params` before accessing its properties
export async function generateMetadata({ params }: StoreType) {
  if (!params?.preset) return;

  // Preload data
  const [dynamicPresets] = await Promise.all([getPresets()]);
  const allPresets = [...dynamicPresets];

  const currentPreset = allPresets.find(
    (preset) => preset.name === params.preset,
  );

  return {
    title: currentPreset?.name ?? "Preset Not Found",
    description:
      currentPreset?.description ?? "No description available for this preset.",
  };
}

const Store: React.FC<StoreType> = async ({ params }) => {
  const session = getServerSession(authConfig);
  if (!session) {
    return <p>You are not logged in</p>;
  }
  const currentPreset = params?.preset ?? "";
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryFn: () => getPresets(),
    queryKey: ["all_presets_"],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPageContent current_preset={currentPreset} />
    </HydrationBoundary>
  );
};

export default Store;
