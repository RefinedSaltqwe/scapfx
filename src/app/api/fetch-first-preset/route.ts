import { NextResponse } from "next/server";
import { db } from "@/server/db";

export const runtime = "nodejs"; // Ensure this API runs in Node.js

export async function GET() {
  try {
    const firstPreset = await db.preset.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ firstPreset });
  } catch (error) {
    console.error("Error fetching preset:", error);
    return NextResponse.json(
      { error: "Failed to fetch preset" },
      { status: 500 },
    );
  }
}
