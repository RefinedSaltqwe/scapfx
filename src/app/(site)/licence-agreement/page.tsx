import DynamicTitle from "@/components/DynamicTitle";
import LicenseAgreement from "@/components/LicenseAgreement";
import { siteConfig } from "config/site";
import React from "react";

const LicenseAgreementPage: React.FC = () => {
  return (
    <>
      <DynamicTitle title={`Licence Agreement | ${siteConfig.name}`} />
      <LicenseAgreement />
    </>
  );
};
export default LicenseAgreementPage;
