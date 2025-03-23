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
              name: "ScapCreative Lightroom Preset",
              image:
                "https://live.staticflickr.com/65535/54344958259_a9917780a3_o.jpg",
              description:
                "Discover premium Lightroom presets designed to transform your photos with cinematic depth and storytelling aesthetics. The Aether Pack delivers a laid-back, muted cinematic feel, while the Etherea Pack blends nostalgic film tones with modern softness. For a crisp, stylish look, the Zenith Pack enhances contrast and sharpens details. Each preset is fully customizable, giving you creative freedom to refine your photography with ease.",
              brand: {
                "@type": "Brand",
                name: "ScapCreative",
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "CAD",
                price: "14.99",
                availability: "https://schema.org/InStock",
                url: "https://scapcreative.com/shop/aether",
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
