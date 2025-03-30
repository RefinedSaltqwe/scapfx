import { siteConfig } from "config/site";
import React from "react";

type layoutProps = {
  children: React.ReactNode;
};
export const generateMetadata = () => {
  return {
    title: `Forgot Password | ${siteConfig.name}`,
    description:
      "Forgot your password? Reset it here and regain access to your ScapCreative account to manage your Lightroom presets and digital products securely.",
    keywords:
      "reset password, forgot password, account recovery, ScapCreative, Lightroom presets, digital products, user account, secure login",
  };
};

const layout: React.FC<layoutProps> = ({ children }) => {
  return <>{children}</>;
};
export default layout;
