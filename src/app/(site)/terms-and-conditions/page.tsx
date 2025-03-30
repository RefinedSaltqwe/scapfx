import DynamicTitle from "@/components/DynamicTitle";
import TermsAndConditions from "@/components/TermsAndConditions";
import { siteConfig } from "config/site";
import React from "react";

export const generateMetadata = () => {
  return {
    title: "Terms and Conditions | ScapCreative",
    description:
      "Read the Terms and Conditions of ScapCreative, where you can find details on the use of our Lightroom presets, payment policies, intellectual property, privacy, and more.",
    keywords:
      "terms and conditions, Lightroom presets, photo editing, digital products, eCommerce terms, ScapCreative, product usage policy",
  };
};

const TermsAndConditionPage: React.FC = () => {
  return (
    <>
      <DynamicTitle title={`Terms and Conditions | ${siteConfig.name}`} />
      <TermsAndConditions />
    </>
  );
};
export default TermsAndConditionPage;
