import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { siteConfig } from "config/site";
import { type Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import Navigation from "../components/Navigation";
import Footer from "@/components/Footer";
import ModalProvider from "@/components/providers/ModalProvider";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
                price: "15.00",
                availability: "https://schema.org/InStock",
                url: "https://scapcreative.com/shop/zenith",
              },
            }),
          }}
        />
      </head>
      <body className={cn("min-h-screen font-sans", "bg-background")}>
        <ModalProvider />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
