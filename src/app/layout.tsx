import Footer from "@/components/Footer";
import NextTopLoaderWrapper from "@/components/NextTopLoaderWrapper";
import DataProvider from "@/components/providers/DataProvider";
import ModalProvider from "@/components/providers/ModalProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "config/site";
import { type Metadata } from "next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import Navigation from "../components/Navigation";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getPresets } from "@/server/queries/fetch-presets";
import { HydrationBoundary } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name}`,
  description: siteConfig.description,
  icons: [{ rel: "icon", url: siteConfig.icon, href: siteConfig.icon }],
  other: {
    "theme-color": siteConfig.theme_color,
    "color-scheme": siteConfig.color_scheme,
    "twitter:image": siteConfig.twitter_image,
    "twitter:card": siteConfig.twitter_card,
    "og:url": siteConfig.og_url,
    "og:image": siteConfig.og_image,
    "og:type": siteConfig.og_type,
  },
};

export default async function RootLayout({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session }>) {
  const queryClient = new QueryClient();

  // Prefetch presets once
  await queryClient.prefetchQuery({
    queryFn: getPresets,
    queryKey: ["all_presets_"],
  });

  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <Script
          id="product-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Scapranger Lightroom Preset",
              image: "https://yourdomain.com/images/bright-airy.jpg",
              description:
                "Enhance your photos with a bright and airy feel. Perfect for Instagram and bloggers.",
              brand: {
                "@type": "Brand",
                name: "Scapranger",
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "CAD",
                price: "14.99",
                availability: "https://schema.org/InStock",
                url: "https://scapcreative.com/shop/zenith",
              },
            }),
          }}
        />
      </head>
      <body className={cn("min-h-screen font-sans", "bg-background")}>
        <QueryProvider>
          <SessionProvider session={session}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ModalProvider />
              <NextTopLoaderWrapper>
                <DataProvider>
                  <Navigation />
                  {children}
                  <Footer />
                  <Toaster />
                  <SpeedInsights />
                  <Analytics />
                </DataProvider>
              </NextTopLoaderWrapper>
            </HydrationBoundary>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
