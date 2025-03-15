import DynamicTitle from "@/components/DynamicTitle";
import SignUpForm from "@/components/Forms/SignUp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { siteConfig } from "config/site";
import { AlertCircle } from "lucide-react";
import React from "react";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <DynamicTitle title={`Create Account | ${siteConfig.name}`} />
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
