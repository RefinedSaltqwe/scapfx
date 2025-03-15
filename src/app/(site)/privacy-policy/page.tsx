import DynamicTitle from "@/components/DynamicTitle";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { siteConfig } from "config/site";
import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <DynamicTitle title={`Privacy Policy | ${siteConfig.name}`} />
      <PrivacyPolicy />
    </>
  );
};
export default PrivacyPolicyPage;
