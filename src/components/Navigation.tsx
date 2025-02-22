"use client";

import { cn } from "@/lib/utils";
import { Search, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navigation: React.FC = () => {
  const [isAtTop, setIsAtTop] = useState(true);

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
                  href="#"
                  className="text flex h-full w-full items-center gap-4"
                >
                  <span className="sr-only">Scap Creative</span>
                  <Image
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    alt="subaccount logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                  <span className="text-primary-foreground text-2xl font-medium">
                    Scap Creative
                  </span>
                </Link>
              </div>

              <div className="flex flex-1 items-center justify-end">
                {/* Search */}
                <Link href="#" className="text-primary-foreground p-2">
                  <span className="sr-only">Search</span>
                  <Search aria-hidden="true" className="size-6 stroke-1" />
                </Link>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-8">
                  <Link
                    href="#"
                    className="text-primary-foreground group -m-2 flex items-center p-2"
                  >
                    <ShoppingBasket
                      aria-hidden="true"
                      className="size-6 shrink-0 stroke-1"
                    />
                    <span className="ml-2 text-sm font-medium">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
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
