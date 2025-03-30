import LicenseAgreement from "@/components/LicenseAgreement";
import { siteConfig } from "config/site";
import React from "react";

export const generateMetadata = () => {
  return {
    title: `License Agreement | ${siteConfig.name}`,
    description:
      "Review the License Agreement of ScapCreative to understand the terms of use for our Lightroom presets, including permitted uses, restrictions, and intellectual property rights.",
    keywords:
      "license agreement, terms of use, Lightroom presets, digital products, usage rights, intellectual property, ScapCreative, product license, end-user license agreement (EULA)",
  };
};

const LicenseAgreementPage: React.FC = () => {
  return <LicenseAgreement />;
};
export default LicenseAgreementPage;
