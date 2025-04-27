import React from "react";
import MainPageContent from "./_components/MainPageContent";
import { redirect } from "next/navigation";
import { getPresetById } from "@/server/queries/fetch-preset";
import { siteConfig } from "config/site";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type StoreType = {
  params: {
    preset: string;
  };
};

export async function generateMetadata({ params }: StoreType) {
  const presetId = params.preset;
  const product = await getPresetById(presetId);

  if (!product) {
    return {
      title: "Preset Not Found",
      description: "No preset specified.",
    };
  }

  const productName = product.name.replace(/\b\w/g, (char) =>
    char.toUpperCase(),
  );

  return {
    title: `${productName} | ${siteConfig.name}`,
    description: `Discover the ${productName} Lightroom preset pack by ScapCreative. Transform your photos with cinematic depth, vibrant colors, and film-inspired tones. Fully customizable for any photographer.`,
    keywords: `${product.name}, ${siteConfig.keywords}`,
    og: {
      title: `${productName} | ScapCreative Lightroom Presets`,
      description: `Transform your photos with the ${productName} preset by ScapCreative. Achieve professional photo editing with film tones and cinematic depth.`,
      url: `https://scapcreative.com/products/${product.id}`,
      image: siteConfig.og_url,
      type: "product",
    },
    twitter: {
      card: "summary_large_image",
      title: `${productName} | ScapCreative Lightroom Presets`,
      description: `Get the ${productName} Lightroom preset and elevate your photography with modern filmic tones.`,
      image: siteConfig.twitter_image,
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
  const currentPreset = params.preset;

  if (!currentPreset || currentPreset === "undefined") {
    redirect("/shop");
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => getPresetById(currentPreset),
    queryKey: ["get_preset_by_id", currentPreset],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPageContent current_preset={currentPreset} />
    </HydrationBoundary>
  );
};

export default Store;
