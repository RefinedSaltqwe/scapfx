"use client";
import { FetchUserSchema } from "@/server/queries/fetch-login-details/schema";
import { Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import Loader from "../Loader";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type LoginFormProps = {
  s?: string;
};

const LoginForm: React.FC<LoginFormProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FetchUserSchema>>({
    resolver: zodResolver(FetchUserSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof FetchUserSchema>) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      setError("The provided email and password do not match our records.");
      form.reset({
        ...values,
        password: "", // Clear the password field
      });
      setLoading(false);
    } else {
      router.push("/account/testId"); // Redirect on successful login
    }
  };

  return (
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex items-center justify-between">
                <FormLabel className="text-primary data-[error=true]:text-destructive">
                  Password
                </FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-primary text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                    onClick={() => setShowPassword(!showPassword)}
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
            className="bg-primary hover:bg-primary focus-visible:outline-primary flex h-12 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white uppercase shadow-sm focus-visible:outline focus-visible:outline-offset-2"
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
            ) : (
              "Login"
            )}
          </Button>

          {/* Forgot Password & Sign Up Links */}
          <div className="text-primary flex w-full text-sm">
            <span className="mr-1 ml-auto font-medium">No account yet?</span>
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
  );
};

export default LoginForm;
