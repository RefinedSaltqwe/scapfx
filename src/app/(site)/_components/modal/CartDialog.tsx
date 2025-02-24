"use client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/stores/useCart";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { X } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { siteConfig } from "config/site";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CartDialog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const open = useCart((state) => state.isOpen);
  const onClose = useCart((state) => state.onClose);
  const presets = useCart((state) => state.presets);
  const removePreset = useCart((state) => state.removePreset);

  // Memoize subtotal calculations to avoid unnecessary recalculations
  const subTotal = useMemo(
    () =>
      presets.reduce((total, preset) => {
        return !isNaN(preset.price) ? total + preset.price : total;
      }, 0),
    [presets],
  );

  const subTotalPrevPrice = useMemo(
    () =>
      presets.reduce((total, preset) => {
        return !isNaN(preset.prevPrice) ? total + preset.prevPrice : total;
      }, 0),
    [presets],
  );
  const cartItemsCount = presets.length;

  // Memoize remove function to prevent unnecessary re-renders
  const handleRemovePreset = useCallback(
    (productId: string) => {
      removePreset(productId);
    },
    [removePreset],
  );

  // Extract productIds from presets object
  const stripeProductIds = presets.map((item) => ({
    productId: item.productId,
  }));

  // Stripe checkout session
  const handleCheckout = async () => {
    if (cartItemsCount == 0) return;
    setLoading(true);
    const res = await fetch("/api/stripe/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: stripeProductIds }), //Send data to api
    });

    // Extract the response data (sessionId) from api/stripe/checkout_sessions
    const data = (await res.json()) as { sessionId: string };

    const { sessionId }: { sessionId: string } = data;

    if (!sessionId) {
      throw new Error("Session ID is missing in the response.");
    }

    //Redirect to Stripe checkout
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-100">
      <DialogBackdrop
        transition
        className="bg-primary/80 fixed inset-0 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="bg-popover flex h-full flex-col overflow-y-scroll shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-popover-foreground text-lg font-medium">
                      Cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() => onClose()}
                        className="hover:text-muted-foreground relative -m-2 cursor-pointer p-2 text-gray-400"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <X aria-hidden="true" className="size-6 stroke-1" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cartItemsCount == 0 ? (
                        <div className="h-3xl flex w-full flex-col items-center py-16">
                          <span className="text-muted-foreground/50 text-md font-medium">
                            Your cart is empty.
                          </span>
                        </div>
                      ) : (
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {presets.map((product) => (
                            <li key={product.productId} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <Image
                                  src={product.heroImg}
                                  alt={product.name}
                                  width={24}
                                  height={24}
                                  className="size-full object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="text-popover-foreground flex justify-between text-base font-medium">
                                    <div className="flex flex-col items-start">
                                      <h3 className="uppercase">
                                        <a href={`/shop/${product.name}`}>
                                          {product.name}
                                        </a>
                                      </h3>

                                      <p className="text-muted-foreground mt-1 text-sm">
                                        Preset
                                      </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                      <p className="ml-4">
                                        {`$${product.price.toFixed(2)} ${siteConfig.currency}`}
                                      </p>
                                      <span className="text-muted-foreground text-[12px] line-through">{`$${product.prevPrice.toFixed(2)} ${siteConfig.currency}`}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-end text-sm">
                                  <div className="flex">
                                    <Button
                                      onClick={() =>
                                        handleRemovePreset(product.productId)
                                      }
                                      variant="ghost"
                                      type="button"
                                      className="text-secondary-foreground hover:text-secondary-foreground-500 font-normal"
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="text-popover-foreground flex justify-between text-base font-medium">
                    <p>Subtotal</p>
                    <div className="flex flex-col items-end">
                      <p>{`$${subTotal.toFixed(2)} ${siteConfig.currency}`}</p>
                      <span className="text-muted-foreground text-[12px] line-through">{`$${subTotalPrevPrice.toFixed(2)}`}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-sm">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Button
                      className="mt-8 h-12 w-full uppercase"
                      onClick={handleCheckout}
                      disabled={loading || cartItemsCount == 0}
                    >
                      {loading ? "Redirecting to Stripe" : "Checkout"}
                    </Button>
                  </div>
                  <div className="text-muted-foreground mt-6 flex justify-center text-center text-sm">
                    <p>
                      or{" "}
                      <Button
                        variant={"link"}
                        onClick={() => onClose()}
                        className="text-primary hover:text-primary/50 font-medium uppercase"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </Button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
export default CartDialog;
