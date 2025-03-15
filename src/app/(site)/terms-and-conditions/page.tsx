import DynamicTitle from "@/components/DynamicTitle";
import TermsAndConditions from "@/components/TermsAndConditions";
import { siteConfig } from "config/site";
import React from "react";

const TermsAndConditionPage: React.FC = () => {
  return (
    <>
      <DynamicTitle title={`Terms and Conditions | ${siteConfig.name}`} />
      <TermsAndConditions />
    </>
  );
};
export default TermsAndConditionPage;
