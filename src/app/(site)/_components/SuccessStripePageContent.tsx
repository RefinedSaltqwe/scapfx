"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { presets } from "@/data";
import { useAction } from "@/hooks/useSafeAction";
import { createUserPreset } from "@/server/actions/create-user-checkout-success";
import { getUserPresets } from "@/server/queries/fetch-user-presets";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

type SuccessStripePageContentProps = {
  sessionId: string;
};

const SuccessStripePageContent: React.FC<SuccessStripePageContentProps> = ({
  sessionId,
}) => {
  if (!sessionId) {
    redirect("/shop");
  }
  const { data: userPresets } = useQuery({
    queryFn: () => getUserPresets(sessionId),
    queryKey: ["user_presets_", sessionId],
  });

  const [loading, setLoading] = useState(true);
  const [dbData, setDbData] = useState(true);
  const [sessionData, setSessionData] = useState({
    email: "",
    name: "",
    createdAt: 0,
    lineItems: [""],
  });

  const getCustomerStripeDetails = async (sessionId: string) => {
    try {
      const res = await fetch("/api/stripe/customer_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId }),
      });

      if (!res.ok) {
        throw new Error("No products found.");
      }

      const data = (await res.json()) as {
        email: string;
        name: string;
        createdAt: number;
        lineItems: string[];
      };

      setSessionData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        setSessionData((prev) => ({ ...prev, lineItems: [] }));
      }
    } finally {
      setLoading(false);
      setDbData(false); // Only set once
    }
  };

  const { execute: executeCreateUserPreset } = useAction(createUserPreset, {
    onSuccess: (data) => {
      setLoading(false);
      if (data.success) {
        toast.success("Email sent.");
      } else {
        toast.error("Something went wrong - sending the email unsuccessful.");
      }
    },
  });

  useEffect(() => {
    // If no presets in db, fetch Stripe details and update state
    if (userPresets?.length === 0 && dbData) {
      void getCustomerStripeDetails(sessionId);
    } else {
      // If Presets exist in db
      const lineItems: string[] =
        userPresets?.map((item) => item.preset.productId) ?? [];

      setSessionData({
        email: userPresets?.[0]?.userEmail ?? "",
        name: userPresets?.[0]?.user?.name ?? "",
        createdAt: 0,
        lineItems,
      });
      setLoading(false);
    }
  }, [sessionId, userPresets, dbData]);

  useEffect(() => {
    if (!dbData) {
      // Insert Data to Database
      setLoading(true);
      void executeCreateUserPreset({
        userEmail: sessionData.email,
        stripeSessionId: sessionId,
        createdAt: Number(sessionData.createdAt),
        priceId: sessionData.lineItems,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbData]);

  return (
    <main className="bg-background -mt-[60px] px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <h1 className="text-primary text-base font-medium">
            {loading ? (
              <Loader classNames="h-4 w-4 border-2 border-foreground/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
            ) : (
              "Thank you!"
            )}
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight">
            {loading
              ? `Generating your download link(s).`
              : userPresets?.length === 1
                ? "Your file is ready for download."
                : `Your files are ready for download.`}
          </p>
          <p className="text-muted-foreground mt-2 text-base">
            {loading
              ? "We'll also email you the link to this page, or you can download your files from the Purchase History page."
              : `We've emailed you the link to this page, or you can download your files from the Purchase History page.`}
          </p>
        </div>

        <section
          aria-labelledby="order-heading"
          className="border-muted mt-10 border-t"
        >
          <h2 id="order-heading" className="sr-only">
            Your order
          </h2>

          <h3 className="sr-only">Items</h3>
          {loading ? (
            <>
              <h2 className="text-primary mt-6 text-base font-medium">
                Do not leave this page. We are generating your download links.
                Please wait—we appreciate your patience!
              </h2>
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="border-muted flex space-x-6 border-b py-10"
                >
                  <Skeleton className="h-[200px] w-[200px] rounded-md" />
                  <div className="flex flex-auto flex-col">
                    <div className="flex w-full flex-col">
                      <Skeleton className="h-[20px] w-[100px] rounded-md" />
                      <Skeleton className="mt-2 h-[100px] w-full rounded-md" />
                      <Skeleton className="mt-5 ml-auto h-[40px] w-[150px] rounded-md" />
                      <Skeleton className="mt-5 h-[20px] w-[65px] rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : sessionData.lineItems.length > 0 ? (
            presets
              .filter((preset) =>
                sessionData.lineItems.includes(preset.productId),
              )
              .map((product) => (
                <div
                  key={product.productId}
                  className="border-muted flex space-x-6 border-b py-10"
                >
                  <Image
                    alt={product.name}
                    src={product.heroImg}
                    className="size-20 flex-none rounded-lg bg-gray-100 object-cover sm:size-40"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={200}
                    height={200}
                  />
                  <div className="flex flex-auto flex-col">
                    <div>
                      <h4 className="text-primary font-medium capitalize">
                        <Link href={`/shop/${product.name}`}>
                          {product.name} Pack
                        </Link>
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">
                        {product.description}
                      </p>
                    </div>
                    <Button
                      type="button"
                      className="mt-5 ml-auto font-normal"
                      asChild
                    >
                      <a href={`/api/download-${product.name}-zip`}>
                        Download<span aria-hidden="true"> &rarr;</span>
                      </a>
                    </Button>
                    <div className="mt-5 flex flex-1 items-end">
                      <dl className="divide-muted flex divide-x text-sm">
                        <div className="flex pl-4 sm:pl-6">
                          <dt className="text-primary font-medium">Price </dt>
                          <dd className="text-mutedsecondary-foreground">{`: $${product.price}`}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-muted-foreground mt-10 text-center">
              No products found.
            </p>
          )}

          <div className="sm:ml-40 sm:pl-6">
            <div className="py-6 text-right">
              <Link
                href="/shop/zenith"
                className="text-primary text-sm font-medium"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const SuccessStripePage: React.FC<SuccessStripePageContentProps> = ({
  sessionId,
}) => (
  <Suspense fallback={<Loader />}>
    <SuccessStripePageContent sessionId={sessionId} />
  </Suspense>
);

export default SuccessStripePage;
