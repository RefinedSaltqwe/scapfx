import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React from "react";

type SiteLayoutProps = {
  children: React.ReactNode;
};

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};
export default SiteLayout;
