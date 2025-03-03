import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin, href } = req.nextUrl;

  // Redirect /shop and root to /shop/zenith
  if (pathname === "/shop" || pathname === "/") {
    return NextResponse.redirect(`${origin}/shop/zenith`);
  }

  // Protect all /account/[userId] routes (including /purchase-history)
  if (pathname.startsWith("/account/")) {
    console.log("COOKIES IN MIDDLEWARE:", req.cookies.getAll()); // Debugging

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    console.log("TOKEN IN MIDDLEWARE:", token); // Debugging

    // if (!token) {
    //   console.log("Redirecting to login because token is null"); // Debugging
    //   const loginUrl = new URL("/login", req.nextUrl.origin);
    //   loginUrl.searchParams.set("callbackUrl", href);
    //   return NextResponse.redirect(loginUrl);
    // }
  }

  return NextResponse.next();
}

// Apply middleware to /shop and all /account/[userId] pages (including purchase-history) , "/account", "/account/:path*"
export const config = {
  matcher: ["/shop", "/account", "/account/:path*"],
};
