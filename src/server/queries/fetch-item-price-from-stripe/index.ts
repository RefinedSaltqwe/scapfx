"use server";
import { stripe } from "@/lib/stripe";

export async function getStripePriceByPriceId(priceId: string) {
  try {
    const price = await stripe.prices.retrieve(priceId);
    // console.log(price.unit_amount); // Price in smallest currency unit (e.g., cents)
    // console.log(price.currency); // Currency (e.g., 'usd')
    return JSON.stringify({
      id: price.id,
      unit_amount: price.unit_amount,
      currency: price.currency,
    });
  } catch (error) {
    console.error("Error retrieving price:", error);
  }
}
