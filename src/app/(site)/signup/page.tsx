import SignUpForm from "@/components/Forms/SignUp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { siteConfig } from "config/site";
import { AlertCircle } from "lucide-react";
import React from "react";

export const generateMetadata = () => {
  return {
    title: `Create Account | ${siteConfig.name}`,
    description:
      "Sign up for a ScapCreative account to access and manage your purchased Lightroom presets and get exclusive updates",
    keywords:
      "create account, sign up, ScapCreative, Lightroom presets, digital products, photography tools, user account, creative resources",
  };
};

const SignUpPage: React.FC = () => {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important!</AlertTitle>
          <AlertDescription>
            If you previously purchased from our website without logging in, use
            the same email you entered at Stripe checkout to access your
            purchase history.
          </AlertDescription>
        </Alert>
        <SignUpForm />
      </div>
    </div>
  );
};
export default SignUpPage;
