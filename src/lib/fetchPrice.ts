// lib/fetchPrice.ts

import { getStripePriceByPriceId } from "@/server/queries/fetch-item-price-from-stripe";

export async function fetchPrice(productId: string): Promise<number> {
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
