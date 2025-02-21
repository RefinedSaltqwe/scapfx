import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { siteConfig } from "config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${siteConfig.name} Innovations`,
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
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body className={cn("min-h-screen font-sans")}>{children}</body>
    </html>
  );
}
