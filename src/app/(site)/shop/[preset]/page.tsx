import React from "react";
import MainPageContent from "./_components/MainPageContent";
import { redirect } from "next/navigation";
import { getPresetById } from "@/server/queries/fetch-preset";
import { siteConfig } from "config/site";

type StoreType = {
  params: {
    preset?: string;
  };
};

export async function generateMetadata({ params }: StoreType) {
  const presetId = params?.preset;
  const product = await getPresetById(presetId ?? "");

  if (!product) {
    return {
      title: "Preset Not Found",
      description: "No preset specified.",
    };
  }

  return {
    title: `${product.name} | ${siteConfig.name}`,
    description: `Discover the ${product.name} Lightroom preset by ScapCreative. Transform your photos with cinematic depth, vibrant colors, and film-inspired tones. Fully customizable for any photographer.`,
    keywords: `${product.name}, ${siteConfig.keywords}`,
    og: {
      title: `${product.name} | ScapCreative Lightroom Presets`,
      description: `Transform your photos with the ${product.name} preset by ScapCreative. Achieve professional photo editing with film tones and cinematic depth.`,
      url: `https://scapcreative.com/products/${product.id}`, // Assuming each product has a unique URL slug
      image: siteConfig.og_url, // Image specific to the product
      type: "product",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ScapCreative Lightroom Presets`,
      description: `Get the ${product.name} Lightroom preset and elevate your photography with modern filmic tones.`,
      image: siteConfig.twitter_image, // Image specific to the product
    },
    product: {
      "product:price:amount": product.price,
      "product:price:currency": siteConfig.currency || "CAD",
      "product:availability": "in_stock",
      "product:category": "Lightroom Presets",
    },
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
