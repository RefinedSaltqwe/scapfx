import NextTopLoaderWrapper from "@/components/NextTopLoaderWrapper";
import DataProvider from "@/components/providers/DataProvider";
import ModalProvider from "@/components/providers/ModalProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { getPresets } from "@/server/queries/fetch-presets";
import "@/styles/globals.css";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "config/site";
import { type Metadata } from "next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Premium Lightroom Presets"`,
  description: siteConfig.description,
  keywords:
    "shortstache, film tones, silky tones, cinematic presets, Lightroom presets, photo editing, aesthetic photography, customizable presets",
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
    queryKey: ["all_presets"],
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
              name: `${siteConfig.name} | Premium Lightroom Presets"`,
              image:
                "https://scapcreative.com/assets/images/meta-image-twitter.jpg", // Full URL
              description: siteConfig.description,
              brand: {
                "@type": "Brand",
                name: "ScapCreative",
              },
              productID: "cm7pi11vk00010cjo3ahmcfi5", // Add a product ID for better tracking
              mainEntityOfPage:
                "https://www.scapcreative.com/shop/cm7pi11vk00010cjo3ahmcfi5", // URL of the product page
              review: {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "4.8", // Add the rating value
                  bestRating: "5", // Rating scale
                },
                author: {
                  "@type": "Person",
                  name: "Verified Customer",
                },
                datePublished: "2025-03-29", // Add publication date of review
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150", // Adjust based on actual review count
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "CAD",
                price: "24.99",
                priceValidUntil: "2025-12-31", // Optional: include price validity date
                availability: "https://schema.org/InStock",
                url: "https://scapcreative.com",
              },
            }),
          }}
        />

        {/* Meta Pixel Script */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s) {
                if(f.fbq) return; 
                n=f.fbq=function(){
                  n.callMethod? 
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq) f._fbq=n;
                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];
                t=b.createElement(e);
                t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${env.FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className={cn("min-h-screen font-sans", "bg-background")}>
        <QueryProvider>
          <SessionProvider session={session}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ModalProvider />
              <NextTopLoaderWrapper>
                <DataProvider pixel_id={env.FB_PIXEL_ID}>
                  {children}
                </DataProvider>
                <Toaster />
                <SpeedInsights />
                <Analytics mode="production" />
              </NextTopLoaderWrapper>
            </HydrationBoundary>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
