"use client";
import { useLoggedUser } from "@/hooks/stores/useLoggedUser";
import { usePresets } from "@/hooks/stores/usePresets";
import { getStripePriceByPriceId } from "@/server/queries/fetch-item-price-from-stripe";
import { getPresets } from "@/server/queries/fetch-presets";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type DataProviderProps = {
  children: React.ReactNode;
};

async function fetchPrice(productId: string): Promise<number> {
  try {
    // Get the stringified price from Stripe
    const fetchedPrice = await getStripePriceByPriceId(productId);
    if (!fetchedPrice) return 0; // Ensure there's always a fallback value

    // Parse the JSON string returned from Stripe
    const parsed = JSON.parse(fetchedPrice) as {
      currency: string;
      id: string;
      unit_amount: number;
    };

    // Return price in dollars
    return parsed.unit_amount / 100;
  } catch (error) {
    console.error("Error fetching price:", error);
    return 0; // Return 0 as a fallback in case of an error
  }
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const addLoggedUser = useLoggedUser((state) => state.addUser);
  const addAllPresets = usePresets((state) => state.addPreset);

  // Fetch presets using React Query
  const { data: allPresets } = useQuery({
    queryFn: getPresets,
    queryKey: ["all_presets"],
    staleTime: 300_000, // 5 minutes
  });

  useEffect(() => {
    if (!allPresets?.length) return;

    async function fetchAllPrices() {
      try {
        // Fetch prices and update all presets
        const updatedPresets = await Promise.all(
          allPresets!.map(async (preset) => ({
            ...preset,
            price: await fetchPrice(preset.productId),
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
