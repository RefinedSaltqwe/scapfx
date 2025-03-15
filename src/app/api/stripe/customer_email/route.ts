import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CustomError extends Error {
  statusCode?: number;
}

export async function POST(req: Request) {
  try {
    const { sessionId } = (await req.json()) as { sessionId: string };

    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id is required" },
        { status: 400 },
      );
    }

    // Step 1: Fetch session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Step 2: Fetch line items associated with the session
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 10, // Adjust the limit as needed
    });

    // Destruction

    const priceIds = lineItems.data.map((item) => item.price!.id);

    // Return the customer email back to the client using NextResponse
    return NextResponse.json(
      {
        email: session.customer_details?.email,
        licenceAgreement:
          session.metadata?.licenceAgreement === "accepted" ? true : false,
        name: session.customer_details?.name,
        createdAt: session.created, //payment id - can be used to retrieve product info
        lineItems: priceIds,
      },
      { status: 200 },
    );
    // return NextResponse.json({ email: sessionId }, { status: 200 });
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
