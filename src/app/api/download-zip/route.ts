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

    // Get the file from Supabase Storage (replace 'your_bucket' with your actual bucket name)
    const { data } = supabase.storage
      .from("downloadable-files")
      .getPublicUrl(fileName); // or use `.createSignedUrl` if you want a temporary link

    if (!data) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Return the public URL (or signed URL if needed)
    return NextResponse.json({ url: data.publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
