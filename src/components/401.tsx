"use client";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import { usePresets } from "@/hooks/stores/usePresets";

const Custom401 = () => {
  const preset = usePresets((state) => state.presets);
  return (
    <div className="bg-background flex h-[500px] w-screen flex-col items-center justify-center gap-2 p-4 text-center">
      <Image
        src="/assets/images/error-401.png"
        alt="Picture of error 404"
        width={300}
        height={300}
      />
      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        {`401 Unauthorized - Admin Access Denied!`}
      </h1>
      <p className="text-muted-foreground mt-2 text-sm">
        The request was denied because the client lacks valid authentication
        credentials for the admin side.
      </p>
      <Link
        href={`/shop/${preset[0]?.name}`}
        className="bg-primary text-primary-foreground mt-4 rounded-md p-2 px-2 uppercase"
      >
        <span className="px-2">Back to home</span>
      </Link>
    </div>
  );
};

export default Custom401;
