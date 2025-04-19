"use client";
import LicenseAgreement from "@/components/LicenseAgreement";
import Loader from "@/components/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { useCart } from "@/hooks/stores/useCartStore";
import { useLoggedUser } from "@/hooks/stores/useLoggedUserStore";
import { trackEvent } from "@/lib/fbpixels";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";
import { siteConfig } from "config/site";
import { Info, X, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import React, { useCallback, useMemo, useState } from "react";
import TermsAndConditionPage from "../../terms-and-conditions/page";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CartDialog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const open = useCart((state) => state.isOpen);
  const onClose = useCart((state) => state.onClose);
  const presets = useCart((state) => state.presets);
  const removePreset = useCart((state) => state.removePreset);
  const router = useRouter();
  const user = useLoggedUser((state) => state.user);
  const [isLegalAgreementChecked, setIsLegalAgreementChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("terms"); // State to control which content is displayed

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

  const extractedItems = presets.reduce(
    (acc, item) => {
      acc.totalPrice += item.price; // Summing prices
      acc.ids.push(item.id); // Collecting ids
      acc.names.push(item.name); // Collecting ids
      return acc;
    },
    { totalPrice: 0, ids: [] as string[], names: [] as string[] }, // Initial values
  );

  // Stripe checkout session
  const handleCheckout = async () => {
    if (cartItemsCount === 0) return;
    setLoading(true);

    trackEvent("InitiateCheckout", {
      content_ids: extractedItems.ids,
      content_name: extractedItems.names,
      num_items: extractedItems.ids.length,
      content_type: "product",
      value: extractedItems.totalPrice,
      currency: siteConfig.currency,
    }).catch((error) =>
      console.error("Error tracking InitiateCheckout event:", error),
    );

    const res = await fetch("/api/stripe/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: stripeProductIds,
        email: user?.email,
        legalAgreement: isLegalAgreementChecked,
      }), // Send data to api
    });

    const data = (await res.json()) as { sessionId: string };

    const { sessionId }: { sessionId: string } = data;

    if (!sessionId) {
      throw new Error("Session ID is missing in the response.");
    }

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
                                        <Link href={`/shop/${product.id}`}>
                                          {product.name}
                                        </Link>
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
                      {subTotalPrevPrice > 0 && (
                        <span className="text-muted-foreground text-sm line-through">{`$${subTotalPrevPrice.toFixed(2)}`}</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    {presets.length === 3 && (
                      <>
                        <p className="text-primary font-medium">
                          {/* {`You're eligible for an extra ${env.NEXT_PUBLIC_STRIPE_DISCOUNT}% off!`} */}
                          {`You've unlocked the 3-for-$15 deal.`}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Discount applies automatically at checkout.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Licence Agreement */}
                  <div
                    className={cn(
                      "mt-6 gap-3",
                      cartItemsCount === 0 ? "hidden" : "flex",
                    )}
                  >
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          checked={isLegalAgreementChecked}
                          onChange={() =>
                            setIsLegalAgreementChecked((prev) => !prev)
                          }
                          id="agreements"
                          name="agreements"
                          type="checkbox"
                          className="checked:border-primary checked:bg-primary indeterminate:border-primary indeterminate:bg-primary focus-visible:outline-primary bg-primary-foreground border-primary disabled:border-primary disabled:bg-secondary disabled:checked:bg-secondary col-start-1 row-start-1 cursor-pointer appearance-none rounded border focus-visible:outline focus-visible:outline-offset-2 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="stroke-primary-foreground pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center group-has-[:disabled]:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:checked]:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>

                    <AlertDialog>
                      <label
                        htmlFor="agreementsx"
                        className="text-primary text-sm/6 font-normal"
                      >
                        <span onClick={(e) => e.stopPropagation()}>
                          I agree to the{" "}
                        </span>
                        <AlertDialogTrigger asChild>
                          <span
                            className="cursor-pointer font-medium hover:underline"
                            onClick={() => setActiveTab("terms")} // Set active tab to "terms" when clicked
                          >
                            Terms & Conditions
                          </span>
                        </AlertDialogTrigger>
                        <span>{" and "}</span>
                        <AlertDialogTrigger asChild>
                          <span
                            className="cursor-pointer font-medium hover:underline"
                            onClick={() => setActiveTab("license")} // Set active tab to "license" when clicked
                          >
                            Licence Agreement
                          </span>
                        </AlertDialogTrigger>
                        <span onClick={(e) => e.stopPropagation()}>
                          {" "}
                          before purchasing.
                        </span>
                      </label>

                      <AlertDialogContent className="max-w-3xl!">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex flex-row items-center gap-2">
                            <AlertDialogCancel className="ml-auto w-auto border-0 uppercase shadow-none hover:bg-transparent">
                              <XIcon className="h-5 w-5" />
                            </AlertDialogCancel>
                          </AlertDialogTitle>
                          <AlertDialogDescription asChild>
                            <div className="max-h-[500px] overflow-y-auto">
                              {activeTab === "terms" && (
                                <TermsAndConditionPage />
                              )}{" "}
                              {/* Show Terms if activeTab is "terms" */}
                              {activeTab === "license" && (
                                <LicenseAgreement />
                              )}{" "}
                              {/* Show License Agreement if activeTab is "license" */}
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex">
                          <AlertDialogAction className="uppercase">
                            Close
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <div>
                    {user?.id === "empty" ? (
                      <AlertDialog>
                        <AlertDialogTrigger
                          disabled={
                            loading ||
                            cartItemsCount === 0 ||
                            !isLegalAgreementChecked
                          }
                          className={cn(
                            "mt-8 h-12 w-full cursor-pointer rounded-md text-sm font-medium uppercase transition-colors",
                            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs", // Normal state
                            "disabled:pointer-events-none disabled:opacity-50", // Disabled state
                          )}
                        >
                          Checkout
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex flex-row items-center gap-2">
                              <Info className="h-5 w-5" />
                              Heads up!
                              <AlertDialogCancel className="ml-auto w-auto border-0 uppercase shadow-none hover:bg-transparent">
                                <XIcon className="h-5 w-5" />
                              </AlertDialogCancel>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {`If you have purchased from us before, please log in to view your purchase history and avoid duplicate orders. `}
                              <strong>As stated in our </strong>
                              <Link
                                className="underline"
                                href={`/terms-and-conditions`}
                              >
                                <strong>Terms and Conditions</strong>
                              </Link>

                              <strong>
                                , duplicate purchases will not be refunded.
                              </strong>
                              <br />
                              <br />
                              {`If you wish to proceed, you will be securely redirected to `}
                              <strong>Stripe</strong>
                              {` to complete your payment.`}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex">
                            <Button
                              onClick={handleCheckout}
                              disabled={loading || cartItemsCount == 0}
                              className="h-12 w-full uppercase"
                              variant={"secondary"}
                            >
                              {loading ? (
                                <>
                                  <Loader classNames="h-4 w-4 border-2 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
                                  Redirecting to Stripe
                                </>
                              ) : (
                                "Checkout with Stripe"
                              )}
                            </Button>
                            <AlertDialogAction
                              onClick={() => {
                                router.push("/login");
                                onClose();
                              }}
                              disabled={loading || cartItemsCount == 0}
                              className="h-12 w-full uppercase"
                            >
                              Login
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <Button
                        onClick={handleCheckout}
                        disabled={
                          loading ||
                          cartItemsCount == 0 ||
                          !isLegalAgreementChecked
                        }
                        className="mt-8 h-12 w-full uppercase"
                      >
                        {loading ? (
                          <>
                            <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
                            Redirecting to Stripe
                          </>
                        ) : (
                          "Checkout with Stripe"
                        )}
                      </Button>
                    )}
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
