"use client";

import { useCart } from "@/hooks/stores/useCart";
import { cn } from "@/lib/utils";
import { ShoppingBasket, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navigation: React.FC = () => {
  const { data: session, status } = useSession();
  console.log("Navigation.tsx -> Session: ", session);

  const pathname = usePathname();
  const pages =
    pathname.includes("checkout_success") ||
    pathname.includes("login") ||
    pathname.includes("signup") ||
    pathname.includes("account") ||
    pathname.includes("create_account");

  const [isAtTop, setIsAtTop] = useState(true);
  const openCart = useCart((state) => state.onOpen);
  const presets = useCart((state) => state.presets);

  const cartCounter = presets.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (status === "loading") {
    //!! FIX THIS WITH SKELETON
    return <p>Loading...Navigation.tsx</p>;
  }

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full",
        isAtTop ? "bg-transparent" : "bg-foreground/30 backdrop-blur-sm",
      )}
    >
      <header className="relative">
        <nav
          aria-label="Top"
          className="mx-auto max-w-[1500px] sm:px-6 lg:px-8"
        >
          <div className="px-4 pb-0">
            <div className="flex h-14 items-center justify-between">
              {/* Logo */}
              <div className="flex flex-1">
                <Link
                  href="/shop/zenith"
                  className="text flex h-full items-center gap-1"
                >
                  <span className="sr-only">scap.</span>
                  <Image
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    alt="subaccount logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                  <span
                    className={cn(
                      "text-primary-foreground text-2xl font-medium",
                      pages && "text-primary",
                      !isAtTop && "text-primary-foreground!",
                    )}
                  >
                    scap.
                  </span>
                </Link>
              </div>

              <div className={cn("flex flex-1 items-center justify-end")}>
                {/* Login */}
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <span className="sr-only">Account</span>
                      <User
                        aria-hidden="true"
                        className={cn(
                          "text-primary-foreground size-6 stroke-1",
                          pages && "text-primary",
                          !isAtTop && "text-primary-foreground!",
                        )}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        {session.user.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Purchase History</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signOut()}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/login"
                    className={cn(
                      "text-primary-foreground p-2",
                      pages && "text-primary",
                      !isAtTop && "text-primary-foreground!",
                    )}
                  >
                    <span className="sr-only">Login</span>
                    Login
                  </Link>
                )}

                {/* Cart */}
                <div className={"ml-4 flow-root lg:ml-8"}>
                  <span
                    onClick={() => openCart()}
                    className={cn(
                      "text-primary-foreground group -m-2 flex cursor-pointer items-center p-2",
                      pages && "text-primary",
                      !isAtTop && "text-primary-foreground!",
                    )}
                  >
                    <ShoppingBasket
                      aria-hidden="true"
                      className="size-6 shrink-0 stroke-1"
                    />
                    <span className="ml-2 text-sm font-normal">
                      {cartCounter}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Navigation;
