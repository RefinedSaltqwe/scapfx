"use client";
import { useAction } from "@/hooks/useSafeAction";
import { createUser } from "@/server/actions/create-user";
import { CreateUserSchema } from "@/server/actions/create-user/schema";
import { Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import Link from "next/link";

type SignUpFormProps = {
  s?: string;
};

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const { execute: executeCreateUser, isLoading: isCreatingUser } = useAction(
    createUser,
    {
      onSuccess: () => {
        toast.success("User has been created.", {
          duration: 5000,
        });
        router.push(`/login`);
      },
      onError: (error) => {
        toast.error(error, {
          duration: 5000,
        });
      },
    },
  );

  const onSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
    void executeCreateUser({
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
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
              <FormLabel className="text-primary data-[error=true]:text-destructive">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={"password"}
                    placeholder="Enter your password"
                    {...field}
                    className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-primary data-[error=true]:text-destructive">
                Confirm password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={"password"}
                    placeholder="Confirm password"
                    {...field}
                    className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col items-center justify-between gap-4">
          <Button
            className="bg-primary hover:bg-primary focus-visible:outline-primary flex h-12 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white uppercase shadow-sm focus-visible:outline focus-visible:outline-offset-2"
            disabled={isCreatingUser}
            type="submit"
          >
            {isCreatingUser ? (
              <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
            ) : (
              "Login"
            )}
          </Button>
          {/* Login link */}
          <div className="text-primary flex w-full text-sm">
            <span className="mr-1 ml-auto font-medium">{`Already have an account?`}</span>
            <Link
              href="/login"
              className="text-primary text-sm hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default SignUpForm;
