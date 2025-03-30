import { siteConfig } from "config/site";
import React from "react";

type layoutProps = {
  children: React.ReactNode;
};
export const generateMetadata = () => {
  return {
    title: `Change Password | ${siteConfig.name}`,
    description:
      "Update your password to keep your ScapCreative account secure and protect access to your purchased Lightroom presets and digital products.",
    keywords:
      "change password, update password, account security, ScapCreative, Lightroom presets, digital products, user account, secure login",
  };
};

const layout: React.FC<layoutProps> = ({ children }) => {
  return <>{children}</>;
};
export default layout;
