import DynamicTitle from "@/components/DynamicTitle";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { siteConfig } from "config/site";
import React from "react";

export const generateMetadata = () => {
  return {
    title: "Privacy Policy | ScapCreative",
    description:
      "Review the Privacy Policy of ScapCreative to understand how we collect, use, and protect your personal data when you purchase Lightroom presets and use our website.",
    keywords:
      "privacy policy, data protection, personal data, privacy practices, ScapCreative, Lightroom presets, user privacy, digital products, GDPR compliance",
  };
};

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <DynamicTitle title={`Privacy Policy | ${siteConfig.name}`} />
      <PrivacyPolicy />
    </>
  );
};
export default PrivacyPolicyPage;
