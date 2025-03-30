import React from "react";

type layoutProps = {
  children: React.ReactNode;
};
export const generateMetadata = () => {
  return {
    title: "Terms and Conditions | ScapCreative",
    description:
      "Read the Terms and Conditions of ScapCreative, where you can find details on the use of our Lightroom presets, payment policies, intellectual property, privacy, and more.",
    keywords:
      "terms and conditions, Lightroom presets, photo editing, digital products, eCommerce terms, ScapCreative, product usage policy",
  };
};

const layout: React.FC<layoutProps> = ({ children }) => {
  return <>{children}</>;
};
export default layout;
