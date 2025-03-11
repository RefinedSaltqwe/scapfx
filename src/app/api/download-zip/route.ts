// app/api/download/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env";

// Initialize Supabase client
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function GET(req: Request) {
  try {
    // Extract file name from the query parameters (assuming it's passed as a query param)
    const url = new URL(req.url);
    const fileName = url.searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { error: "fileName is required" },
        { status: 400 },
      );
    }

    //use `.getPublicUrl` if you want a permanent public URL to a file stored in Supabase
    // const { data } = supabase.storage
    //   .from(env.SUPABASE_BUCKET_NAME)
    //   .getPublicUrl(fileName);

    // or use `.createSignedUrl` if you want a temporary link
    const { data, error } = await supabase.storage
      .from(env.SUPABASE_BUCKET_NAME)
      .createSignedUrl(fileName, 60 * 60 * 24 * 30 * 6); // 60 seconds * 60 minutes * 24 hours * 30 days * 6 months

    if (error) {
      console.error("Error generating signed URL:", error);
    } else {
      console.log("Signed URL:", data.signedUrl);
    }

    // Return the public URL (or signed URL if needed)
    return NextResponse.json({ url: data?.signedUrl }, { status: 200 });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
