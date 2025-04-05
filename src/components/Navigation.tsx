"use client";

import { useCart } from "@/hooks/stores/useCartStore";
import { useLoggedUser } from "@/hooks/stores/useLoggedUserStore";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ShoppingBasket, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
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
import { usePresets } from "@/hooks/stores/usePresetsStore";
import { Button } from "./ui/button";

const Navigation: React.FC = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const removeLoggedUser = useLoggedUser((state) => state.removeUser);
  const allPresets = usePresets((state) => state.presets);

  const isPagesPath =
    pathname.includes("checkout_success") ||
    pathname.includes("forgot-password") ||
    pathname.includes("licence-agreement") ||
    pathname.includes("terms-and-conditions") ||
    pathname.includes("privacy-policy") ||
    pathname.includes("about") ||
    pathname.includes("login") ||
    pathname.includes("signup") ||
    pathname.includes("account") ||
    pathname.includes("free-preset") ||
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
                  href={`/shop/${allPresets[0]?.id}`}
                  className="text flex h-full items-center justify-center gap-1 text-center"
                >
                  <span className="sr-only">ScapCreative</span>
                  {!isAtTop ? (
                    <>
                      <Image
                        src="/assets/images/logo-white.png"
                        alt="ScapCreative White Logo"
                        width={175}
                        height={23.2}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="hidden sm:block"
                      />
                      <Image
                        src="/assets/images/logo-white-short.png"
                        alt="ScapCreative White Monogram Logo"
                        width={85}
                        height={22.95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="block sm:hidden"
                      />
                    </>
                  ) : isPagesPath ? (
                    <>
                      <Image
                        src="/assets/images/logo-black.png"
                        alt="ScapCreative Black Logo"
                        width={175}
                        height={23.2}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="hidden sm:block"
                      />
                      <Image
                        src="/assets/images/logo-black-short.png"
                        alt="ScapCreative Black Short Logo"
                        width={85}
                        height={22.95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="block sm:hidden"
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src="/assets/images/logo-white.png"
                        alt="ScapCreative White Logo"
                        width={175}
                        height={23.2}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="hidden sm:block"
                      />
                      <Image
                        src="/assets/images/logo-white-short.png"
                        alt="ScapCreative White Short Logo"
                        width={85}
                        height={22.95}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="block sm:hidden"
                      />
                    </>
                  )}
                </Link>
              </div>

              <div className="flex items-center justify-end">
                {session?.user.type === "ADMIN" && (
                  <div className="mr-4 flow-root lg:mr-8">
                    <Button
                      variant={"ghost"}
                      onClick={() => router.push("/admin/dashboard")}
                      className={cn(
                        "hover:text-primary-foreground text-primary-foreground hover:bg-transparent",
                      )}
                    >
                      <span className="sr-only">Dashboard Icon</span>
                      <LayoutDashboard
                        aria-hidden="true"
                        className={iconClassNames}
                      />
                    </Button>
                  </div>
                )}
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
