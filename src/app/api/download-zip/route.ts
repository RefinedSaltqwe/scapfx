import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env";

// Supabase client
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // Only on server
);

// Define the expected request body structure
interface DownloadRequest {
  fileName: string;
}

export async function POST(req: Request) {
  try {
    // Parse JSON safely
    const body = (await req.json()) as DownloadRequest;

    // Validate fileName
    if (!body.fileName || typeof body.fileName !== "string") {
      return NextResponse.json({ error: "Invalid fileName" }, { status: 400 });
    }

    // Generate signed URL
    const { data, error } = await supabase.storage
      .from(env.SUPABASE_BUCKET_NAME)
      .createSignedUrl(`${body.fileName}${env.ADIT}`, 60 * 60); // 1 hour expiry

    if (error || !data) {
      return NextResponse.json(
        { error: "Error generating signed URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: data.signedUrl });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
