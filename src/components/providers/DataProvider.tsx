"use client";
import { useLoggedUser } from "@/hooks/stores/useLoggedUser";
import { usePresets } from "@/hooks/stores/usePresets";
import { fetchPrice } from "@/lib/fetchPrice";
import { getPresets } from "@/server/queries/fetch-presets";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type DataProviderProps = {
  children: React.ReactNode;
  pixel_id: string;
};

const DataProvider: React.FC<DataProviderProps> = ({ children, pixel_id }) => {
  const { data: session } = useSession();
  const addLoggedUser = useLoggedUser((state) => state.addUser);
  const addAllPresets = usePresets((state) => state.addPreset);
  // const pathname = usePathname(); // Get the current path

  // Fetch presets using React Query
  const { data: allPresets } = useQuery({
    queryFn: getPresets,
    queryKey: ["all_presets"],
    staleTime: 300_000, // 5 minutes
  });

  // useEffect(() => {
  //   if (!pixel_id) return; // Prevent running if no Pixel ID
  //   initFacebookPixel(pixel_id);
  //   trackPageView();
  // }, [pixel_id]); // Only runs once on mount

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     trackPageView();
  //   }
  // }, [pathname]);

  useEffect(() => {
    if (!allPresets?.length) return;

    async function fetchAllPrices() {
      try {
        // Fetch prices and update all presets
        const updatedPresets = await Promise.all(
          allPresets!.map(async (preset) => ({
            ...preset,
            price: await fetchPrice(preset.productId), // Fetch prices from Stripe
          })),
        );

        // Update the presets with fetched prices
        addAllPresets(updatedPresets);
      } catch (error) {
        console.error("Error fetching all prices:", error);
      }
    }

    void fetchAllPrices();
  }, [addAllPresets, allPresets]);

  useEffect(() => {
    if (session?.user) {
      addLoggedUser(session.user.currentUser.user, session.user.ownedPresets);
    }
  }, [session, addLoggedUser]);

  return <>{children}</>;
};

export default DataProvider;
