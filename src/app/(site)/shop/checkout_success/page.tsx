"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { presets } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const SuccessStripePageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState({
    email: "",
    name: "",
    payment_intent: "",
    lineItems: [""],
  });

  if (!sessionId) {
    redirect("/shop");
  }

  const getEmail = async (sessionId: string) => {
    const res = await fetch("/api/stripe/customer_email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionId }),
    });

    const data = (await res.json()) as {
      email: string;
      name: string;
      payment_intent: string;
      lineItems: string[];
    };

    if (!res) {
      redirect("/shop");
    }

    setSessionData(data);
    setLoading(false);
  };

  useEffect(() => {
    void getEmail(sessionId);
  }, [sessionId]);

  return (
    <main className="bg-background -mt-[60px] px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="max-w-xl">
          <h1 className="text-primary text-base font-medium">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight">
            {`Your file(s) are ready for download.`}
          </p>
          <p className="text-muted-foreground mt-2 text-base">
            {`We've also sent you an email with a downloadable link, or you can download your files from the Order History page.`}
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-primary">Order number</dt>
            <dd className="text-primary mt-2">51547878755545848512</dd>
          </dl>
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
              <div className="border-muted flex space-x-6 border-b py-10">
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
              <div className="border-muted flex space-x-6 border-b py-10">
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
              <div className="border-muted flex space-x-6 border-b py-10">
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
            </>
          ) : (
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
                    alt="TODO"
                    src={product.heroImg}
                    className="size-20 flex-none rounded-lg bg-gray-100 object-cover sm:size-40"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    width={200}
                    height={200}
                  />
                  <div className="flex flex-auto flex-col">
                    <div>
                      <h4 className="text-primary font-medium capitalize">
                        <a href={`/shop/${product.name}`}>
                          {product.name} Pack
                        </a>
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">
                        {product.description}
                      </p>
                    </div>
                    <Button type="button" className="mt-5 ml-auto font-normal">
                      Download<span aria-hidden="true"> &rarr;</span>
                    </Button>
                    <div className="mt-5 flex flex-1 items-end">
                      <dl className="divide-muted flex divide-x text-sm">
                        <div className="flex pl-4 sm:pl-6">
                          <dt className="text-primary font-medium">Price </dt>
                          <dd className="text-mutedsecondary-foreground">
                            {`: $${product.price}`}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              ))
          )}
          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="text-primary font-medium">Subtotal</dt>
                <dd className="text-secondary-foreground">$36.00</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-primary flex font-medium">
                  Discount
                  <span className="bg-muted ml-2 rounded-full px-2 py-0.5 text-xs text-gray-600">
                    STUDENT50
                  </span>
                </dt>
                <dd className="text-secondary-foreground">-$18.00 (50%)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-primary font-medium">Total</dt>
                <dd className="text-primary">$23.00</dd>
              </div>
            </dl>
            <div className="border-muted mt-16 border-t py-6 text-right">
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

const SuccessStripePage = () => (
  <Suspense fallback={<Loader />}>
    <SuccessStripePageContent />
  </Suspense>
);

export default SuccessStripePage;
