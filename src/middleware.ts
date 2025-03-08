import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin, href } = req.nextUrl;
  const cookies = req.cookies;
  const sessionToken = cookies.get("__Secure-authjs.session-token.0");
  const sessionToken01 = cookies.get("authjs.session-token.0");

  console.log("session from middleware", !!sessionToken || !!sessionToken01);

  // Redirect /shop and root to /shop/zenith
  if (pathname === "/shop" || pathname === "/") {
    return NextResponse.redirect(`${origin}/shop/aether`);
  }

  // If user is not logged in and tries to access account. Redirect to login page
  if (pathname.startsWith("/account/")) {
    //? If user is not logged in
    if (sessionToken || sessionToken01) {
      return NextResponse.next();
    } else {
      console.log("Redirecting to login because token is null"); // Debugging
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", href);
      return NextResponse.redirect(loginUrl);
    }
  }
  // If user is logged in and tries to access login. Redirect to store
  if (pathname.startsWith("/login")) {
    if (sessionToken || sessionToken01) {
      const mainStore = new URL("/shop/aether", req.nextUrl.origin);
      mainStore.searchParams.set("callbackUrl", href);
      return NextResponse.redirect(mainStore);
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// Apply middleware to /shop and all /account/[userId] pages (including purchase-history) , "/account", "/account/:path*"
export const config = {
  matcher: ["/shop", "/account", "/account/:path*", "/login"],
};
