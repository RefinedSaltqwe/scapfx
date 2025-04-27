"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "@/hooks/useSafeAction";
import { forgotPassword } from "@/server/queries/forgot-password";
import { ForgotPasswordSchema } from "@/server/queries/forgot-password/schema";
import { Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [emailSent, setEmailSent] = useState<{ sent: boolean; email: string }>({
    sent: false,
    email: "",
  });
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const { execute: executeForgotPassword, isLoading } = useAction(
    forgotPassword,
    {
      onSuccess: (data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        toast.success("Email sent.");
        setEmailSent({ sent: true, email: data.data?.email ?? "" });
      },
      onError: (error) => {
        console.error(error);
        setError("An error occurred while sending the email.");
      },
    },
  );

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    void executeForgotPassword({ email: values.email });
  };

  useEffect(() => {
    if (session?.user) {
      router.push(`/account/${session.user.id}`);
    }
  }, [session, router]);

  if (emailSent.sent) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <h1 className="text-primary mt-10 text-center text-2xl font-bold tracking-tight">
            Email sent
          </h1>
          <p className="text-primary text-center text-sm">
            An email has been sent to{" "}
            <span className="font-semibold">{emailSent.email}</span>. Please
            check your inbox and follow the instructions to change your
            password.
          </p>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader classNames="h-8 w-8 border-3 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <h1 className="text-primary mt-10 text-center text-2xl font-bold tracking-tight">
          Forgot password
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-primary data-[error=true]:text-destructive">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      {...field}
                      className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            {error && <span className="text-destructive text-sm">{error}</span>}

            <div className="flex w-full flex-col items-center justify-between gap-4">
              <Button
                className="bg-primary hover:bg-primary focus-visible:outline-primary flex h-12 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white uppercase shadow-sm focus-visible:outline focus-visible:outline-offset-2"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
                ) : (
                  "Submit"
                )}
              </Button>

              {/* Sign Up Link */}
              <div className="text-primary flex w-full text-sm">
                <span className="mr-1 ml-auto font-medium">
                  No account yet?
                </span>
                <Link
                  href="/signup"
                  className="text-primary text-sm hover:underline"
                >
                  Sign up here
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
