import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin, href } = req.nextUrl;
  const cookies = req.cookies.getAll();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const sessionToken = cookies.some((cookie: { name: string | string[] }) =>
    cookie.name?.includes("session-token"),
  );

  // console.log("TOKEN", sessionToken, cookies);

  // Redirect /shop and root to /shop/aether
  if (pathname === "/" || pathname === "/shop") {
    return NextResponse.redirect(`${origin}/shop/aether`);
  }

  // Handle /account routes: check login status and redirect accordingly
  if (pathname.startsWith("/account/")) {
    if (sessionToken) {
      return NextResponse.next(); // User is logged in, allow access
    }
    // User is not logged in, redirect to login
    console.log("Redirecting to login because token is null"); // Debugging
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", href);
    return NextResponse.redirect(loginUrl);
  }

  // Handle /login: if user is logged in, redirect to store page
  if (pathname.startsWith("/login") && sessionToken) {
    const mainStore = new URL("/shop/aether", req.nextUrl.origin);
    mainStore.searchParams.set("callbackUrl", href);
    return NextResponse.redirect(mainStore);
  }

  return NextResponse.next();
}

// Apply middleware to /shop and all /account/[userId] pages (including purchase-history) , "/account", "/account/:path*"
export const config = {
  matcher: ["/shop", "/account", "/account/:path*", "/login"],
};
