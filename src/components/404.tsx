"use client";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import { usePresets } from "@/hooks/stores/usePresetsStore";

const Custom404 = () => {
  const preset = usePresets((state) => state.presets);
  return (
    <div className="bg-background flex h-[500px] w-screen flex-col items-center justify-center gap-2 p-4 text-center">
      <Image
        src="/assets/images/error-404.png"
        alt="Picture of error 404"
        width={300}
        height={300}
      />
      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        {`404: The page you are looking for isn't here`}
      </h1>
      <p className="text-muted-foreground mt-2 text-sm">
        You came here by mistake. Try using the navigation.
      </p>
      <Link
        href={`/shop/${preset[0]?.id}`}
        className="bg-primary text-primary-foreground mt-4 rounded-md p-2 px-2 uppercase"
      >
        <span className="px-2">Back to home</span>
      </Link>
    </div>
  );
};

export default Custom404;
