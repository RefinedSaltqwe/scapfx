import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function GET() {
  try {
    // Fetch total revenue from successful charges
    const payments: Stripe.ApiList<Stripe.BalanceTransaction> =
      await stripe.balanceTransactions.list({
        limit: 100,
        type: "charge",
      });

    const totalRevenue =
      (payments.data?.reduce((acc, txn) => acc + (txn.amount || 0), 0) ?? 0) /
      100; // Convert cents to dollars

    // Fetch total customers
    const customers: Stripe.ApiList<Stripe.Customer> =
      await stripe.customers.list({ limit: 100 });

    const totalCustomers = customers.data?.length ?? 0;

    // Fetch total payments
    const totalPayments = payments.data?.length ?? 0;

    // Fetch recent transactions (last 5)
    const recentTransactions =
      payments.data?.slice(0, 5).map((txn) => ({
        id: txn.id,
        amount: (txn.amount ?? 0) / 100,
        currency: txn.currency?.toUpperCase() ?? "USD",
        created: new Date((txn.created ?? 0) * 1000).toISOString(),
        status: txn.status ?? "unknown",
      })) ?? [];

    // Fetch total subscriptions
    const subscriptions: Stripe.ApiList<Stripe.Subscription> =
      await stripe.subscriptions.list({ limit: 100 });

    const totalSubscriptions = subscriptions.data?.length ?? 0;

    return NextResponse.json(
      {
        totalRevenue,
        totalCustomers,
        totalPayments,
        totalSubscriptions,
        recentTransactions,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
