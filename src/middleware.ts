import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "./env";

export async function middleware(req: NextRequest) {
  const { pathname, origin, href } = req.nextUrl;

  // Redirect /shop and root to /shop/zenith
  if (pathname === "/shop" || pathname === "/") {
    return NextResponse.redirect(`${origin}/shop/zenith`);
  }

  // Protect all /account/[userId] routes (including /purchase-history)
  if (pathname.startsWith("/account/")) {
    const token = await getToken({ req, secret: env.AUTH_SECRET });

    console.log("Token in middleware:", token); // Debug

    if (!token) {
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("callbackUrl", href); // Redirect back after login
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware to /shop and all /account/[userId] pages (including purchase-history)
export const config = {
  matcher: ["/shop", "/account", "/account/:path*"],
};
