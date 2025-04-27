import DataProvider from "@/components/providers/DataProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { getPresetNav } from "@/server/queries/fetch-presets-nav";
import "@/styles/globals.css";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "config/site";
import { type Metadata } from "next";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { lazy } from "react";

const Toaster = lazy(() =>
  import("sonner").then((module) => ({
    default: module.Toaster,
  })),
);
const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((module) => ({
    default: module.Analytics,
  })),
);
const ModalProvider = lazy(
  () => import("@/components/providers/ModalProvider"),
);
const NextTopLoaderWrapper = lazy(
  () => import("@/components/NextTopLoaderWrapper"),
);

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Premium Lightroom Presets`,
  icons: [{ rel: "icon", url: siteConfig.icon, href: siteConfig.icon }],
  other: {
    "theme-color": siteConfig.theme_color,
    "color-scheme": siteConfig.color_scheme,
    "twitter:image": siteConfig.twitter_image,
    "twitter:card": siteConfig.twitter_card,
    "og:type": siteConfig.og_type,
  },
};

export default async function RootLayout({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session }>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: getPresetNav,
    queryKey: ["preset_nav"],
  });

  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <Head>
          <meta name="description" content={siteConfig.description} />
          <meta name="keywords" content={siteConfig.keywords} />
          <meta property="og:url" content={siteConfig.og_url} />
          <meta property="og:image" content={siteConfig.og_image} />
        </Head>

        {/* Product Schema */}
        <Script
          id="product-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: `${siteConfig.name} | Premium Lightroom Presets`,
              image:
                "https://scapcreative.com/assets/images/meta-image-twitter.jpg",
              description: siteConfig.description,
              brand: { "@type": "Brand", name: `${siteConfig.name}` },
              productID: "cm7pi11vk00010cjo3ahmcfi5",
              mainEntityOfPage:
                "https://www.scapcreative.com/shop/cm7pi11vk00010cjo3ahmcfi5",
              review: {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "4.8",
                  bestRating: "5",
                },
                author: { "@type": "Person", name: "Verified Customer" },
                datePublished: "2025-03-29",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150",
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "CAD",
                price: "24.99",
                priceValidUntil: "2025-12-31",
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
              </NextTopLoaderWrapper>
            </HydrationBoundary>
          </SessionProvider>
        </QueryProvider>
        <SpeedInsights />
        <Analytics mode="production" />
      </body>
    </html>
  );
}
