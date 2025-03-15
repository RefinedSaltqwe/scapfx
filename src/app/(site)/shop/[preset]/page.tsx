import React from "react";
import MainPageContent from "./_components/MainPageContent";
import DynamicTitle from "@/components/DynamicTitle";
import { siteConfig } from "config/site";

type StoreType = {
  params: {
    preset?: string;
  };
};

// Generate metadata dynamically based on preset name (without fetching)
export async function generateMetadata({ params }: StoreType) {
  const presetName = params?.preset;

  if (!presetName) {
    return {
      title: "Preset Not Found",
      description: "No preset specified.",
    };
  }

  return {
    title: presetName,
    description: `Explore the ${presetName} preset for your edits.`,
  };
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Store: React.FC<StoreType> = async ({ params }) => {
  const currentPreset = params?.preset ?? "";

  return (
    <>
      <DynamicTitle
        title={`${capitalize(currentPreset)} | ${siteConfig.name}`}
      />
      <MainPageContent current_preset={currentPreset} />
    </>
  );
};

export default Store;
