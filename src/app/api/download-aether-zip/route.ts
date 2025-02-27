import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "files", "Test.zip"); //! Change file name

  try {
    const fileBuffer = await fs.promises.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": 'attachment; filename="Test.zip"',
        "Content-Type": "application/zip",
      },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
