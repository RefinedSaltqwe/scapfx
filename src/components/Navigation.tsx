"use client";

import { useCart } from "@/hooks/stores/useCart";
import { useLoggedUser } from "@/hooks/stores/useLoggedUser";
import { cn } from "@/lib/utils";
import { ShoppingBasket, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";
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
  const pathname = usePathname();
  const router = useRouter();
  const removeLoggedUser = useLoggedUser((state) => state.removeUser);

  const isPagesPath =
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
    const handleScroll = () => setIsAtTop(window.scrollY === 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (status === "loading") {
    return <div className={cn("sticky top-0 z-50 h-[56px] w-full")} />;
  }

  const headerClassNames = cn(
    "sticky top-0 z-50 w-full transition-background-color duration-300",
    isAtTop ? "bg-transparent" : "bg-foreground/30 backdrop-blur-sm",
  );

  const iconClassNames = cn(
    "text-primary-foreground size-6 stroke-1",
    isPagesPath && "text-primary",
    !isAtTop && "text-primary-foreground!",
  );

  const cartClassNames = cn(
    "text-primary-foreground group -m-2 flex cursor-pointer items-center p-2",
    isPagesPath && "text-primary",
    !isAtTop && "text-primary-foreground!",
  );

  const loginClassNames = cn(
    "text-primary-foreground p-2",
    isPagesPath && "text-primary",
    !isAtTop && "text-primary-foreground!",
  );

  return (
    <div className={headerClassNames}>
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
                  href={`/shop/aether`}
                  className="text flex h-full items-center gap-1"
                >
                  <span className="sr-only">scap.</span>
                  {/* <Image
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    alt="subaccount logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                  /> */}
                  <span
                    className={cn(
                      "text-primary-foreground text-2xl font-medium",
                      isPagesPath && "text-primary",
                      !isAtTop && "text-primary-foreground!",
                    )}
                  >
                    scap.
                  </span>
                </Link>
              </div>

              <div className="flex items-center justify-end">
                {/* Account */}
                {session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <span className="sr-only">Account</span>
                      <User aria-hidden="true" className={iconClassNames} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        {session.user.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/account/${session.user.id}`)
                        }
                      >
                        Purchase History
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="mt-1"
                        onClick={async () => {
                          removeLoggedUser();
                          await signOut();
                          router.push(`/login`);
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login" className={loginClassNames}>
                    <span className="sr-only">Login</span>
                    Login
                  </Link>
                )}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-8">
                  <span onClick={openCart} className={cartClassNames}>
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
