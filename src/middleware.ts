import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "./env";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect /shop to /shop/zenith
  if (pathname === "/shop" || pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/shop/zenith";
    return NextResponse.redirect(url);
  }

  // Protect purchase history page: Only allow authenticated users
  if (pathname.startsWith("/shop/purchase-history")) {
    const token = await getToken({ req, secret: env.AUTH_SECRET });

    if (!token) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.href); // Redirect back after login
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware to /shop and /shop/purchase-history
export const config = {
  matcher: ["/shop", "/shop/purchase-history"],
};
