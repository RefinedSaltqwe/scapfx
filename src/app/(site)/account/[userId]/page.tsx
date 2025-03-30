import { siteConfig } from "config/site";
import React from "react";
import AccountPageContents from "../../_components/AccountPageContents";

export const generateMetadata = () => {
  return {
    title: `My Account | ${siteConfig.name}`,
    description:
      "Manage your ScapCreative account, access your purchased Lightroom presets, update your profile, and view your order history—all in one place.",
    keywords:
      "my account, user dashboard, ScapCreative, Lightroom presets, digital products, order history, profile settings, account management",
  };
};

const AccountPage: React.FC = () => {
  return <AccountPageContents />;
};
export default AccountPage;
