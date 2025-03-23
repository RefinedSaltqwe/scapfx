"use client";
import { usePresets } from "@/hooks/stores/usePresetsStore";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React, { useMemo } from "react";

type NextTopLoaderWrapperProps = {
  children: React.ReactNode;
};

const NextTopLoaderWrapper: React.FC<NextTopLoaderWrapperProps> = ({
  children,
}) => {
  const pathname = usePathname();
  const presets = usePresets((state) => state.presets);

  // Memoized color computation to avoid unnecessary re-renders
  const color = useMemo(
    () => presets?.find((p) => pathname.includes(p.name))?.color ?? "#000",
    [pathname, presets],
  );

  return (
    <>
      <NextTopLoader
        color={color}
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0"
        zIndex={1600}
        showAtBottom={false}
      />
      {children}
    </>
  );
};

export default NextTopLoaderWrapper;
