import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React from "react";
import Banner from "./_components/Banner";
import { env } from "@/env";

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
    </>
  );
};
export default SiteLayout;
