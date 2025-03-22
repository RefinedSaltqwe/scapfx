"use client";

import { Button } from "@/components/ui/button";
import { useLoggedUser } from "@/hooks/stores/useLoggedUser";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  HomeIcon,
  MenuIcon,
  Search,
  Settings,
  ShoppingBag,
  Store,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    current: true,
  },
  {
    name: "Product Catalog",
    href: "/admin/product-catalog",
    icon: ShoppingBag,
    current: false,
  },
];

export default function Example({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const user = useLoggedUser((state) => state.user);
  const removeLoggedUser = useLoggedUser((state) => state.removeUser);
  const pathname = usePathname();
  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="bg-primary/80 fixed inset-0 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <X aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <Image
                    src="/assets/images/logo-black.png"
                    alt="ScapCreative Black Logo"
                    width={175}
                    height={23.2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => {
                          const isActive = pathname.includes(item.href);
                          return (
                            <li key={item.name}>
                              <Link
                                onClick={() => setSidebarOpen(false)}
                                href={isActive ? "#" : item.href}
                                className={cn(
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold",
                                  isActive
                                    ? "text-primary bg-muted"
                                    : "text-muted-foreground hover:text-primary hover:bg-muted",
                                )}
                              >
                                <item.icon
                                  className={cn(
                                    "size-6",
                                    isActive
                                      ? "text-primary"
                                      : "text-muted-foreground",
                                  )}
                                />
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <Link
                        href="#"
                        className="group hover:text-primary hover:bg-muted text-muted-foreground -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                      >
                        <Settings
                          aria-hidden="true"
                          className="group-hover:text-primary text-muted-foreground size-6 shrink-0"
                        />
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                src="/assets/images/logo-black.png"
                alt="ScapCreative Black Logo"
                width={175}
                height={23.2}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname.includes(item.href);
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold",
                              isActive
                                ? "text-primary bg-muted"
                                : "text-muted-foreground hover:text-primary hover:bg-muted",
                            )}
                          >
                            <item.icon
                              className={cn(
                                "size-6",
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground",
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <li className="mt-auto">
                  <Link
                    href="#"
                    className="group hover:text-primary hover:bg-muted text-muted-foreground -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                  >
                    <Settings
                      aria-hidden="true"
                      className="group-hover:text-primary text-muted-foreground size-6 shrink-0"
                    />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="text-muted-foreground -m-2.5 p-2.5 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-200 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                <input
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="placeholder:text-muted-foreground text-primary col-start-1 row-start-1 block size-full bg-white pl-8 text-base outline-none sm:text-sm/6"
                />
                <Search
                  aria-hidden="true"
                  className="text-muted-foreground pointer-events-none col-start-1 row-start-1 size-5 self-center"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Button
                  variant={"ghost"}
                  onClick={() => router.push("/shop/")}
                  className="hover:text-muted0 text-muted-foreground -m-2.5 p-2.5"
                >
                  <span className="sr-only">Store Icon</span>
                  <Store aria-hidden="true" className="size-6" />
                </Button>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      alt=""
                      src={
                        session?.user.image ??
                        "https://live.staticflickr.com/65535/54344995695_1dd728d26d_b.jpg"
                      }
                      className="bg-muted size-8 rounded-full"
                      width={24}
                      height={24}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="text-primary ml-4 text-sm/6 font-semibold"
                      >
                        {session?.user.name}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="text-muted-foreground ml-2 size-5"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="ring-primary/5 bg-background absolute right-0 z-10 mt-2.5 w-auto origin-top-right rounded-md py-2 shadow-lg ring-1 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <Link
                        href={`/account/${user?.id}`}
                        className="data-[focus]:bg-muted text-primary inline-block px-3 py-1 text-sm/6 whitespace-nowrap data-[focus]:outline-none"
                      >
                        Purchase History
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <span
                        className="data-[focus]:bg-muted text-primary mt-1 block px-3 py-1 text-sm/6 data-[focus]:outline-none"
                        onClick={async () => {
                          removeLoggedUser();
                          await signOut();
                          router.push(`/login`);
                        }}
                      >
                        Logout
                      </span>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
