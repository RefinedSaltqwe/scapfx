import Container from "@/components/Container";
import React from "react";
import ComparisonSlider from "../../_components/ComparisonSlider";
import Details from "../../_components/Details";
import Footer from "../../_components/Footer";
import Gallery from "../../_components/Gallery";
import Hero from "../../_components/Hero";
import Product from "../../_components/Product";
import { presets } from "@/data";
import { type Preset } from "@/types";

type StoreType = {
  params: {
    preset: string;
  };
};

// // Updated `generateMetadata` function to handle async properly
// export async function generateMetadata({
//   params,
// }: {
//   params: { preset: string };
// }) {
//   // Find the preset asynchronously (if needed)
//   const presetName = params.preset; // No await needed for accessing params, but in some cases, you may need to handle async logic here
//   const currentPreset = presets.find((preset) => preset.name === presetName);

//   return {
//     title: currentPreset ? currentPreset.name : "Preset Not Found",
//     description: currentPreset
//       ? currentPreset.description
//       : "No description available",
//   };
// }

const Store: React.FC<StoreType> = async ({ params }) => {
  // Ensure params.preset is handled synchronously, or use async logic if required
  const selectedPreset = params.preset;
  const currentPreset: Preset = presets.find(
    (preset) => preset.name === selectedPreset,
  ) ?? {
    productId: "",
    name: "",
    heroImg: "",
    description: "",
    price: "",
    prevPrice: "",
    selected: false,
    beforeAfterImages: [{ beforeImage: "", afterImage: "" }],
    whatsIncluded: [{ name: "", description: "" }],
    gallery: [""], // Ensure no undefined values here
  };

  const currenPresetIndex =
    presets.findIndex((preset) => preset.name === selectedPreset) + 1;

  return (
    <>
      <Hero />
      <Product currentPreset={currentPreset} index={currenPresetIndex} />
      <Container maxWidth="full" bgColor="bg-secondary">
        <div className="flex w-full flex-col items-center">
          <div className="mx-auto my-16 max-w-2xl text-center lg:max-w-4xl">
            <h2 className="text-primary text-xl font-bold tracking-tight sm:text-2xl">
              {`What you can expect your photos to look like when using my presets.`}
            </h2>
            <p className="text-muted-foreground mt-4">
              They work on a variety of shooting styles varying from landscape
              photography, portraits, night photography as well as urban
              environments, and I regularly use these on my high-end commercial
              work.
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
      <Container maxWidth="lg">
        <Gallery currentPreset={currentPreset} />
      </Container>
      <Footer />
    </>
  );
};

export default Store;
