"use server";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export async function getTotalPaidBySessionId(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent;

    return JSON.stringify({
      sessionId: session.id,
      amount_paid: paymentIntent?.amount_received || 0, // Total amount received in smallest currency unit
      currency: session.currency,
    });
  } catch (error) {
    console.error("Error retrieving total amount paid:", error);
    return null;
  }
}
