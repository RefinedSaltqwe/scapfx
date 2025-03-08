import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin, href } = req.nextUrl;

  // Redirect /shop and root to /shop/zenith
  if (pathname === "/shop" || pathname === "/") {
    return NextResponse.redirect(`${origin}/shop/aether`);
  }

  // Protect all /account/[userId] routes (including /purchase-history)
  if (pathname.startsWith("/account/")) {
    const cookies = req.cookies;
    console.log("COOKIES IN MIDDLEWARE:", req.cookies.getAll()); // Debugging

    // const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });

    const sessionToken = cookies.get("__Secure-authjs.session-token.0");
    console.log("TOKEN IN MIDDLEWARE:", sessionToken); // Debugging

    if (!sessionToken) {
      console.log("Redirecting to login because token is null"); // Debugging
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", href);
      return NextResponse.redirect(loginUrl);
    }

    // if (!cookies) {
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
