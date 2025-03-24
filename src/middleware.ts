import { type Preset } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin, href } = req.nextUrl;
  const cookies = req.cookies.getAll();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const sessionToken = cookies.some((cookie: { name: string | string[] }) =>
    cookie.name?.includes("session-token"),
  );

  const apiUrl = `${req.nextUrl.origin}/api/fetch-first-preset`; // Adjust based on your API route

  try {
    const response = await fetch(apiUrl);
    const { firstPreset } = (await response.json()) as { firstPreset: Preset };

    if ((pathname === "/" || pathname === "/shop") && firstPreset) {
      return NextResponse.redirect(`${origin}/shop/${firstPreset.id}`);
    }
  } catch (error) {
    console.error("Error fetching preset in middleware:", error);
  }
  // Redirect only if firstPreset exists and has an ID
  // Handle /account routes: check login status and redirect accordingly
  if (pathname.startsWith("/account/") || pathname.startsWith("/admin/")) {
    if (sessionToken) {
      return NextResponse.next(); // User is logged in, allow access
    }
    // User is not logged in, redirect to login
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
  matcher: ["/shop", "/account", "/account/:path*", "/login", "/admin/:path*"],
};
