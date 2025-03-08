"use client";

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
import { updatePassword } from "@/server/queries/update-password";
import { UpdatePasswordSchema } from "@/server/queries/update-password/schema";
import { Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { lazy, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

const Loader = lazy(() => import("@/components/Loader"));

const ChangePasswordPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const fpassId = searchParams.get("FPassId");
  const [error, setError] = useState<string | null>(null);
  const [passChanged, setPassChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Redirect to /login if email or fpassId is null
    if (!email || !fpassId) {
      router.push("/login");
    }
  }, [email, fpassId, router]);

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: { email: email ?? "", password: "", id: fpassId ?? "" },
  });

  const { execute: executeChangePassword, isLoading } = useAction(
    updatePassword,
    {
      onSuccess: (data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setPassChanged(true);
        setError(null);
      },
      onError: (err) => {
        console.error(err);
      },
    },
  );

  const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
    void executeChangePassword({
      email: values.email,
      password: values.password,
      id: fpassId ?? "",
    });
  };

  if (passChanged) {
    return (
      <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-sm flex-col space-y-10">
          <h2 className="text-primary mt-10 text-center text-2xl font-bold tracking-tight">
            Password Has Been Changed
          </h2>
          <p className="text-primary text-center text-sm">
            Your password has been successfully updated.
          </p>
          <Button
            onClick={() => router.push("/login")}
            className="h-12 w-full uppercase"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm space-y-10">
        <h2 className="text-primary mt-10 text-center text-2xl font-bold tracking-tight">
          Change Your Password
        </h2>
        <p className="text-primary text-center text-sm">
          You can now change your password. Please enter your new password below
          to complete the process.
        </p>

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
                      disabled
                      className="text-primary focus:outline-primary block h-12 w-full cursor-not-allowed rounded-md bg-gray-200 px-3 py-1.5 text-base outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-primary data-[error=true]:text-destructive">
                      Password
                    </FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            {error && <span className="text-destructive text-sm">{error}</span>}

            <div className="flex w-full flex-col items-center justify-between gap-4">
              <Button
                className="bg-primary hover:bg-primary focus-visible:outline-primary flex h-12 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white uppercase shadow-sm"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
