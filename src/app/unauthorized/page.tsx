import Custom401 from "@/components/401";
import { siteConfig } from "config/site";
import React from "react";
export const generateMetadata = () => {
  return {
    title: `Unauthorized | ${siteConfig.name}`,
    description:
      "401: The request was denied because the client lacks valid authentication credentials for the admin side.",
    keywords:
      "unauthorized, sign in, ScapCreative, Lightroom presets, digital products, user account, photography tools, creative resources",
  };
};
const Unauthorized: React.FC = () => {
  return <Custom401 />;
};
export default Unauthorized;
