"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNewsLetter } from "@/hooks/stores/useNewsLetterTrigger";
import { useAction } from "@/hooks/useSafeAction";
import { createNewsletter } from "@/server/actions/create-newsletter";
import { CreateNewsletterSchema } from "@/server/actions/create-newsletter/schema";
import { Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import Loader from "@/components/Loader";

type NewsLetterProps = {
  x?: string;
};

const NewsLetter: React.FC<NewsLetterProps> = () => {
  const newsletter = useNewsLetter();
  const [subbed, setSubbed] = useState(false);
  const [error, setError] = useState(false);
  const { execute: executeCreateNewsLetter, isLoading } = useAction(
    createNewsletter,
    {
      onSuccess: (data) => {
        console.log(data);
        if (data.emailSent === true) {
          toast.success("Email sent.");
          setSubbed(true);
          setError(false);
        } else if (data.emailSent === false) {
          setError(true);
        }
      },
      onError: (error) => {
        toast.error(error, { position: "top-right" });
        setError(true);
      },
    },
  );

  const form = useForm<z.infer<typeof CreateNewsletterSchema>>({
    resolver: zodResolver(CreateNewsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof CreateNewsletterSchema>) => {
    void executeCreateNewsLetter(values);
  };
  return (
    <Dialog open={newsletter.isOpen} onOpenChange={newsletter.onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {subbed ? "You're In!" : "Get a Free Preset + 15% Off!"}
          </DialogTitle>
          <DialogDescription>
            {subbed
              ? `Check your inbox for your free preset download and 15% discount code 🎉(If you don’t see it, check your spam or promotions folder just in case.)`
              : `Receive a free Lightroom preset instantly—plus get an exclusive 15% discount code for your first order. Perfect for creators who want that soft, film-inspired look.`}
          </DialogDescription>
        </DialogHeader>
        {!subbed && (
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
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        onFocus={(e) => e.target.select()}
                        className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive" />
                    {error && (
                      <p
                        data-slot="form-message"
                        className={"text-destructive text-sm"}
                      >
                        {`Looks like you've already joined our list! Your free
                        preset and discount code should be in your inbox—don't
                        forget to check your spam folder too.`}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="h-12 w-full"
                >
                  {isLoading ? (
                    <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
                  ) : (
                    "Get My Free Preset"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default NewsLetter;
