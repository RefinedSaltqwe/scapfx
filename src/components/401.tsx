"use client";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import { usePresets } from "@/hooks/stores/usePresetsStore";

const Custom401 = () => {
  const preset = usePresets((state) => state.presets);
  return (
    <div className="bg-background flex w-full flex-col items-center justify-center gap-4 p-4 text-center">
      <Image
        src="/assets/images/error-401.png"
        className="mt-10"
        alt="401 Unauthorized"
        width={300}
        height={300}
      />
      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        401 Unauthorized - Admin Access Denied!
      </h1>
      <p className="text-muted-foreground mt-2 text-sm">
        The request was denied because the client lacks valid authentication
        credentials for the admin side.
      </p>
      <Link
        href={`/shop/${preset[0]?.id}`}
        className="bg-primary text-primary-foreground mt-4 rounded-md p-2 px-4 uppercase"
      >
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default Custom401;
