import { env } from "@/env";
import { siteConfig } from "config/site";
import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ACCESS_TOKEN: string = env.META_ACCESS_TOKEN;
const PIXEL_ID: string = env.FB_PIXEL_ID;

interface EventRequestBody {
  event_name: string;
  user_agent: string;
  event_source_url: string;
  value: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: string;
  email?: string; // For Purchase event, email is required
}

interface MetaApiError {
  message: string;
  type: string;
  code: number;
  fbtrace_id: string;
}

interface MetaApiResponse {
  events_received?: number;
  error?: MetaApiError;
}

interface UserData {
  client_user_agent: string;
  em?: string[]; // Only for Purchase event
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Explicitly type the request body
    const body: EventRequestBody = (await req.json()) as EventRequestBody;

    const {
      event_name,
      user_agent,
      event_source_url,
      value,
      currency = siteConfig.currency,
      content_ids = [],
      content_name = "",
      content_type = "product",
      email,
    } = body;

    // Prepare user_data based on event type
    const user_data: UserData = {
      client_user_agent: user_agent, // Do not hash
    };

    if (event_name === "Purchase" && email) {
      user_data.em = [hashEmail(email)]; // Hash email for purchase event
    }

    // Prepare custom_data for the event
    const custom_data = {
      value,
      currency,
      content_ids,
      content_name,
      content_type,
    };

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000), // Current timestamp
          action_source: "website",
          event_source_url,
          user_data,
          custom_data,
        },
      ],
    };

    const response: Response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    // Explicitly type the response JSON
    const data: MetaApiResponse = (await response.json()) as MetaApiResponse;

    if (!response.ok || data.error) {
      console.error("Meta CAPI error:", data);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("CAPI Server Error:", error);
    return NextResponse.json(
      { error: "Server error sending event to Meta" },
      { status: 500 },
    );
  }
}

// Helper function to hash email (only for Purchase events)
function hashEmail(email: string): string {
  return crypto.createHash("sha256").update(email.toLowerCase()).digest("hex");
}
