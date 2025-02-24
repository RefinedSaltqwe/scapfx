"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { presets } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const SuccessStripePageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
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
  };

  useEffect(() => {
    void getEmail(sessionId);
  }, [sessionId]);

  return (
    <main className="relative -mt-[60px] lg:min-h-full">
      <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          alt="TODO"
          src="https://tailwindui.com/plus-assets/img/ecommerce-images/confirmation-page-06-hero.jpg"
          className="size-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <h1 className="text-primary text-sm font-medium">
              Payment successful
            </h1>
            <p className="text-primary mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              {`Thanks for ordering, ${sessionData.name}`}
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your order, we’re currently processing it. So hang
              tight and we’ll send you confirmation very soon!
            </p>

            <dl className="mt-16 text-sm font-medium">
              <dt className="text-primary">Tracking number</dt>
              <dd className="text-primary mt-2">51547878755545848512</dd>
            </dl>

            <ul
              role="list"
              className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
            >
              {presets
                .filter((preset) =>
                  sessionData.lineItems.includes(preset.productId),
                )
                .map((product) => (
                  <li key={product.productId} className="flex space-x-6 py-6">
                    <Image
                      alt={product.name}
                      src={product.heroImg}
                      width={24}
                      height={24}
                      className="size-24 flex-none rounded-md bg-gray-100 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="flex flex-auto flex-col space-y-1">
                      <h3 className="text-primary capitalize">
                        <a href={`/shop/${product.name}`}>{product.name}</a>
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Preset
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-primary flex-none font-medium">
                        {`$${product.price} CAD`}
                      </p>
                      <Button
                        variant="secondary"
                        type="button"
                        className="font-normal"
                      >
                        Download<span aria-hidden="true"> &rarr;</span>
                      </Button>
                    </div>
                  </li>
                ))}
            </ul>

            <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-primary">$72.00</dd>
              </div>

              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-primary">$8.00</dd>
              </div>

              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-primary">$6.40</dd>
              </div>

              <div className="text-primary flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">$86.40</dd>
              </div>
            </dl>

            <dl className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
              <div>
                <dt className="text-primary font-medium">Shipping Address</dt>
                <dd className="mt-2">
                  <address className="not-italic">
                    <span className="block">Kristin Watson</span>
                    <span className="block">7363 Cynthia Pass</span>
                    <span className="block">Toronto, ON N3Y 4H8</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt className="text-primary font-medium">
                  Payment Information
                </dt>
                <dd className="mt-2 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                  <div className="flex-none">
                    <svg
                      width={36}
                      height={24}
                      viewBox="0 0 36 24"
                      aria-hidden="true"
                      className="h-6 w-auto"
                    >
                      <rect rx={4} fill="#224DBA" width={36} height={24} />
                      <path
                        d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                        fill="#fff"
                      />
                    </svg>
                    <p className="sr-only">Visa</p>
                  </div>
                  <div className="flex-auto">
                    <p className="text-primary">Ending with 4242</p>
                    <p>Expires 12 / 21</p>
                  </div>
                </dd>
              </div>
            </dl>

            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link
                href="/shop/"
                className="text-primary-600 text-sm font-medium"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
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
