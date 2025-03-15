import React from "react";
import AccountPageContents from "../../_components/AccountPageContents";
import DynamicTitle from "@/components/DynamicTitle";
import { siteConfig } from "config/site";

const AccountPage: React.FC = () => {
  return (
    <>
      <DynamicTitle title={`Account | ${siteConfig.name}`} />
      <AccountPageContents />
    </>
  );
};
export default AccountPage;
