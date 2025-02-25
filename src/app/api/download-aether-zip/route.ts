import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "files", "Test.zip"); // Store ZIPs in a folder (not `public`)
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Disposition": 'attachment; filename="Test.zip"',
      "Content-Type": "application/zip",
    },
  });
}
