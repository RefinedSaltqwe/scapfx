"use client";
import Loader from "@/components/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { usePresets, type PresetNav } from "@/hooks/stores/usePresetsStore";
import { trackEvent } from "@/lib/fbpixels";
import { getPresetById } from "@/server/queries/fetch-preset";
import { useQuery } from "@tanstack/react-query";
import { siteConfig } from "config/site";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useMemo, useState } from "react";

type PlanProps = {
  preset: PresetNav;
  selectedPreset: string;
  index: number;
};

const Plan: React.FC<PlanProps> = ({ preset, selectedPreset, index }) => {
  // Ensure state only applies on the client after mounting
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const addPreset = usePresets((state) => state.addPreset);
  const allPresets = usePresets((state) => state.presets);

  const {
    data: presetData,
    isLoading: presetsLoading,
    isError: presetsError,
  } = useQuery({
    queryFn: () => getPresetById(preset.id),
    queryKey: ["get_preset_by_id", preset.id],
    staleTime: 300_000, // 5 minutes
    gcTime: 300_000, // 5 minutes
    enabled: !!preset.id,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Ensure the event is only called once when mounted and preset matches
    if (mounted && selectedPreset === preset.id) {
      trackEvent("ViewContent", {
        content_name: preset.name,
        content_ids: [preset.id],
        content_type: "product",
        value: preset.price,
        currency: siteConfig.currency,
        content_category: "presets",
      }).catch((error) =>
        console.error("Error tracking ViewContent event:", error),
      );
    }
  }, [mounted, selectedPreset, preset.id, preset.name, preset.price]);

  const router = useRouter();

  const handleChange = () => {
    if (selectedPreset !== preset.id) {
      setLoading(true);

      const presetExists = allPresets.some(
        (existingPreset) => existingPreset.id === presetData!.id,
      );

      if (!presetsLoading && !presetsError && presetData && !presetExists) {
        addPreset(presetData);
      }
      router.push(`/shop/${preset.id}`);
    }
  };

  // Memoize the label regardless of mounting state
  const presetName = useMemo(
    () => index.toString().padStart(2, "0") + ". " + preset.name,
    [index, preset.name],
  );

  if (!mounted) {
    return <Skeleton className="mb-2 h-14 w-full rounded-md" />;
  }

  return (
    <label
      aria-label={preset.name}
      aria-description={preset.name}
      className="group border-border has-[:checked]:border-primary has-[:checked]:bg-primary/10 flex cursor-pointer flex-row justify-between border p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-none has-[:checked]:relative md:pr-6 md:pl-4"
    >
      <span className="flex items-center gap-3 text-sm">
        {loading ? (
          <Loader classNames="h-4 w-4 border-4 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
        ) : (
          <input
            value={preset.name}
            checked={selectedPreset === preset.id}
            onChange={handleChange}
            name="pricing-preset"
            type="radio"
            className="border-border checked:border-primary checked:bg-primary focus-visible:outline-primary disabled:border-border bg-background disabled:bg-muted relative size-4 appearance-none rounded-full border before:absolute before:inset-1 before:rounded-full before:bg-white focus-visible:outline focus-visible:outline-offset-2 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
          />
        )}

        <span className="group-has-[:checked]:text-primary text-muted-foreground font-medium uppercase">
          {`${presetName}`}
        </span>
      </span>
      <div className="flex flex-col items-end gap-2">
        <span className="text-destructive ml-6 pl-1 text-sm font-semibold group-has-[:checked]:text-red-600 md:ml-0 md:pl-0 md:text-right">
          {`$${preset.price.toFixed(2)} ${siteConfig.currency}`}
        </span>
        <span className="text-muted-foreground text-[12px] font-medium line-through">{`$${preset.prevPrice.toFixed(2)}`}</span>
      </div>
    </label>
  );
};

export default Plan;
