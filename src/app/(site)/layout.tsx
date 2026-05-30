import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React from "react";
import Banner from "./_components/Banner";
import { env } from "@/env";
import Script from "next/script";

type SiteLayoutProps = {
  children: React.ReactNode;
};

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <>
      {env.NEXT_PUBLIC_BANNER === "1" && <Banner />}
      <Navigation />
      {children}
      <Footer />

      <Script
        src="https://syntra-agent.vercel.app/embed/embed.min.js"
        data-workflow-id="6a1b4d224c97a8ade2180b37"
        strategy="afterInteractive"
      />
    </>
  );
};
export default SiteLayout;
