import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React from "react";
import Banner from "./_components/Banner";

type SiteLayoutProps = {
  children: React.ReactNode;
};

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <>
      <Banner />
      <Navigation />
      {children}
      <Footer />
    </>
  );
};
export default SiteLayout;
