"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { useLoggedUser } from "@/hooks/stores/useLoggedUserStore";
import { type Preset } from "@prisma/client";
import { siteConfig } from "config/site";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import DownloadButton from "./DownloadButton";

type AccountPageContentsProps = {
  x?: string;
};

const AccountPageContents: React.FC<AccountPageContentsProps> = () => {
  const user = useLoggedUser((state) => state.user);
  const [loading, setLoading] = useState(true);

  const orders = useMemo(() => {
    if (!user?.ownedPresets) return [];

    // Group presets by stripeSessionId
    const ordersMap = user.ownedPresets.reduce(
      (acc, presetUser) => {
        const {
          stripeSessionId,
          preset,
          createdAt,
          id,
          orderId,
          totalAmountPaid,
          purchasedPrice,
        } = presetUser;

        if (!acc[stripeSessionId]) {
          acc[stripeSessionId] = {
            id,
            stripeSessionId,
            createdAt: new Date(createdAt), // Ensure createdAt is a Date object
            presets: [],
            orderId: orderId ?? "",
            totalAmountPaid: totalAmountPaid ?? 0,
          };
        }

        acc[stripeSessionId].presets.push({
          ...preset,
          price: purchasedPrice ?? 0,
        });

        return acc;
      },
      {} as Record<
        string,
        {
          stripeSessionId: string;
          presets: Preset[];
          createdAt: Date;
          id: string;
          orderId: string;
          totalAmountPaid: number;
        }
      >,
    );

    // Sort the orders by createdAt date in descending order (latest first)
    const sortedOrders = Object.values(ordersMap).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    return sortedOrders;
  }, [user]);

  useEffect(() => {
    if (user?.id !== "empty") {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="bg-background">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Purchase history
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Review the status of your recent orders and download your
              purchased products here.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent purchaes</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orders.length === 0 ? (
                loading ? (
                  <>
                    <Skeleton className="h-[200px] w-full rounded-md" />
                    <Skeleton className="h-[200px] w-full rounded-md" />
                  </>
                ) : (
                  "No orders yet."
                )
              ) : (
                orders.map((order, index) => {
                  return (
                    <div
                      key={`${order.stripeSessionId}-${index}`}
                      className="bg-background border-muted border-t border-b shadow-sm sm:rounded-lg sm:border"
                    >
                      <h3 className="sr-only">
                        Order placed on{" "}
                        <time
                          dateTime={new Date(order.createdAt).toISOString()}
                        >
                          {new Date(order.createdAt).toLocaleDateString()}
                        </time>
                      </h3>

                      <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                        <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                          <div className="flex flex-1 flex-col">
                            <dt className="text-foreground font-medium">
                              Order number
                            </dt>
                            <dd className="text-muted-foreground mt-1 uppercase">
                              {order.orderId}
                              {/* {order.stripeSessionId.slice(-7)} */}
                            </dd>
                          </div>

                          <div className="hidden sm:ml-auto sm:block">
                            {" "}
                            {/* Move Date placed to the right */}
                            <dt className="text-foreground font-medium">
                              Date placed
                            </dt>
                            <dd className="text-muted-foreground mt-1 uppercase">
                              <time
                                dateTime={new Date(
                                  order.createdAt,
                                ).toISOString()}
                              >
                                {new Date(order.createdAt).toLocaleDateString()}
                              </time>
                            </dd>
                          </div>

                          <div className="justify-self-end sm:ml-auto">
                            {" "}
                            {/* Move Total amount to the right */}
                            <dt className="text-foreground font-medium">
                              Total paid
                            </dt>
                            <dd className="text-foreground mt-1 font-medium">
                              {`$${order.totalAmountPaid.toFixed(2)} ${siteConfig.currency}`}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {/* Products */}
                      <h4 className="sr-only">Items</h4>
                      <ul
                        role="list"
                        className="divide-muteborder-muted divide-y"
                      >
                        {order.presets.map((product) => (
                          <li key={product.id} className="p-4 sm:p-6">
                            <div className="flex items-center sm:items-start">
                              <div className="bg-muteborder-muted size-20 shrink-0 overflow-hidden rounded-lg sm:size-40">
                                {product ? (
                                  <Image
                                    alt={product.name}
                                    src={product.heroImg}
                                    width={100}
                                    height={100}
                                    className="size-full object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                ) : (
                                  <Skeleton className="h-[150px] w-[150px] rounded-md" />
                                )}
                              </div>
                              <div className="ml-6 flex-1 text-sm">
                                <div className="text-foreground font-medium capitalize sm:flex sm:justify-between">
                                  <h5>
                                    {product ? (
                                      `${product.name} Pack`
                                    ) : (
                                      <Skeleton className="h-[20px] w-[150px] rounded-md" />
                                    )}
                                  </h5>
                                  <p className="mt-2 sm:mt-0">
                                    {product
                                      ? `$${product.price.toFixed(2)} ${siteConfig.currency}`
                                      : "N/A"}
                                  </p>
                                </div>
                                <p className="text-muted-foreground hidden sm:mt-2 sm:block">
                                  {product
                                    ? product.description
                                    : "No description available"}
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 sm:flex sm:justify-between">
                              <div className="flex items-center">
                                <CheckCircleIcon
                                  aria-hidden="true"
                                  className="text-primary size-5"
                                />
                                <p className="text-muted-foreground ml-2 text-sm font-medium">
                                  Delivered on{" "}
                                  <time
                                    dateTime={new Date(
                                      order.createdAt,
                                    ).toISOString()}
                                  >
                                    {new Date(
                                      order.createdAt,
                                    ).toLocaleDateString()}
                                  </time>
                                </p>
                              </div>

                              <div className="divide-muteborder-muted border-muted mt-6 flex items-center divide-x border-t pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                                <div className="flex flex-1 justify-center pr-4">
                                  <Link
                                    href={`${env.NEXT_PUBLIC_API_URL}/shop/${product.id}`}
                                    className="text-primary hover:text-primary/75 whitespace-nowrap"
                                  >
                                    View product
                                  </Link>
                                </div>
                                <div className="flex flex-1 justify-center pl-4">
                                  {" "}
                                  <DownloadButton fileName={product.name} />
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPageContents;
