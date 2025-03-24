import { getTotalPaidBySessionId } from "@/server/queries/fetch-payment-intent-by-session-stripe";

export async function fetchTotalAmount(sessionId: string): Promise<number> {
  try {
    // Get the stringified response from Stripe
    const fetchedPayment = await getTotalPaidBySessionId(sessionId);
    if (!fetchedPayment) return 0; // Ensure there's always a fallback value

    // Parse the JSON string returned from Stripe
    const parsed = JSON.parse(fetchedPayment) as {
      currency: string;
      sessionId: string;
      amount_paid: number;
    };

    // Return total amount paid in dollars
    return parsed.amount_paid / 100;
  } catch (error) {
    console.error("Error fetching total amount paid:", error);
    return 0; // Return 0 as a fallback in case of an error
  }
}
