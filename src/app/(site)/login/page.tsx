import LoginForm from "@/components/Forms/Login";
import { siteConfig } from "config/site";
import React from "react";

export const generateMetadata = () => {
  return {
    title: `Login | ${siteConfig.name}`,
    description:
      "Log in to your ScapCreative account to access your purchased Lightroom presets, manage your downloads, and stay updated with exclusive content.",
    keywords:
      "login, sign in, ScapCreative, Lightroom presets, digital products, user account, photography tools, creative resources",
  };
};

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
