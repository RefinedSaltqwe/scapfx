"use client";
import Loader from "@/components/Loader";
import { usePresets } from "@/hooks/stores/usePresetsStore";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const ShopPage: React.FC = () => {
  const presets = usePresets((state) => state.presets);

  useEffect(() => {
    if (presets[0]) redirect(`/shop/${presets[0]?.id}`);
  }, [presets]);
  return (
    <div className="flex h-80 items-center justify-center">
      <Loader classNames="h-8 w-8 border-3 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
    </div>
  );
};
export default ShopPage;
