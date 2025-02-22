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

// Server-side code to fetch the preset by parameter
export async function generateMetadata({
  params,
}: {
  params: { preset: string };
}) {
  // No need to await params, it should be synchronous
  const presetName = params.preset; // Ensure params.preset is already a string
  const currentPreset = presets.find((preset) => preset.name === presetName);
  return {
    title: currentPreset ? currentPreset.name : "Preset Not Found",
    description: currentPreset
      ? currentPreset.description
      : "No description available",
  };
}

const Store: React.FC<StoreType> = ({ params }) => {
  // Ensure params is already available before usage, if it's coming from the router
  const currentPreset: Preset = presets.find(
    (preset) => preset.name === params.preset,
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

  return (
    <>
      <Hero />
      <Product currentPreset={currentPreset} />
      <Container maxWidth="lg" bgColor="bg-secondary">
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
        <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2">
          <ComparisonSlider />
          <ComparisonSlider />
          <ComparisonSlider />
          <ComparisonSlider />
        </div>
      </Container>
      <Container maxWidth="lg">
        <Details />
      </Container>
      <Container maxWidth="lg">
        <Gallery />
      </Container>
      <Footer />
    </>
  );
};

export default Store;
