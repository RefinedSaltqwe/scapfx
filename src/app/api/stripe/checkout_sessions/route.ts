import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { type CartItemsStripe } from "@/types";
import { env } from "@/env";
import type Stripe from "stripe";

interface CustomError extends Error {
  statusCode?: number;
}

export async function POST(req: Request) {
  try {
    const headersList = req.headers;
    const origin = headersList.get("origin") ?? "https://scapcreative.com"; // Ensure it's always a string

    // Store data (stripeProductIds) sent from the checkout in client-side
    const { items, email, legalAgreement } = (await req.json()) as {
      email: string;
      items: CartItemsStripe[];
      legalAgreement: boolean;
    };

    // Convert cart items to Stripe's required format
    const line_items = items.map((item) => ({
      price: item.productId,
      quantity: 1,
    }));

    // Create stripe checkout session
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      line_items: line_items,
      mode: "payment",
      success_url: `${origin}/shop/checkout_success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
      customer_email: email === "empty" ? undefined : email,
      metadata: {
        legalAgreement: legalAgreement ? "accepted" : "not_accepted",
      },
    };

    // Apply either promotion codes or a specific discount — not both
    if (line_items.length === 3) {
      sessionPayload.discounts = [{ coupon: env.STRIPE_BUNDLE_DISCOUNT }];
    } else {
      sessionPayload.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);

    // Return the sessionId back to the client using NextResponse
    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      const customError = err as CustomError;
      return NextResponse.json(
        { error: customError.message || "Internal Server Error" },
        { status: customError.statusCode ?? 500 },
      );
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  }
}
