import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { type CartItemsStripe } from "@/types";

interface CustomError extends Error {
  statusCode?: number;
}

export async function POST(req: Request) {
  try {
    const headersList = req.headers;
    const origin = headersList.get("origin") ?? "https://scapcreative.com"; // Ensure it's always a string

    // Store sent data from the checkout button in client
    const { items } = (await req.json()) as { items: CartItemsStripe[] };

    // Convert cart items to Stripe's required format
    const line_items = items.map((item) => ({
      price: item.productId,
      quantity: 1,
    }));

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${origin}/shop/checkout_success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    // Return the session ID back to the client using NextResponse
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
