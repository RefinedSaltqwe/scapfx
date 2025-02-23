import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Check if the request URL is exactly /shop
  if (req.nextUrl.pathname === "/shop" || req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/shop/zenith"; // Redirect to /shop/zenith
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware only to /shop route
export const config = {
  matcher: "/shop",
};
