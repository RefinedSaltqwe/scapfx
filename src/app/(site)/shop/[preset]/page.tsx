import React from "react";
import MainPageContent from "./_components/MainPageContent";
import { redirect } from "next/navigation";

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

const Store: React.FC<StoreType> = async ({ params }) => {
  const currentPreset = params?.preset ?? "";
  if (currentPreset === "undefined") {
    redirect("/shop");
  }

  return (
    <>
      <MainPageContent current_preset={currentPreset} />
    </>
  );
};

export default Store;
