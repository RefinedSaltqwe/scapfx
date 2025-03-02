"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { type Preset } from "@/types";
import { siteConfig } from "config/site";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useMemo, useState } from "react";

type PlanProps = {
  preset: Preset;
  selectedPreset: string;
  index: number;
};

const Plan: React.FC<PlanProps> = ({ preset, selectedPreset, index }) => {
  // Ensure state only applies on the client after mounting
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  const handleChange = () => {
    if (selectedPreset !== preset.name) {
      router.push(`/shop/${preset.name}`);
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
        <input
          value={preset.name}
          checked={selectedPreset === preset.name}
          onChange={handleChange}
          name="pricing-preset"
          type="radio"
          className="border-border checked:border-primary checked:bg-primary focus-visible:outline-primary disabled:border-border bg-background disabled:bg-muted relative size-4 appearance-none rounded-full border before:absolute before:inset-1 before:rounded-full before:bg-white focus-visible:outline focus-visible:outline-offset-2 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
        />
        <span className="group-has-[:checked]:text-primary text-muted-foreground font-medium uppercase">
          {`${presetName}`}
        </span>
      </span>
      <div className="flex flex-col items-end">
        <span className="group-has-[:checked]:text-primary text-muted-foreground ml-6 pl-1 text-sm font-medium md:ml-0 md:pl-0 md:text-right">
          {`$${preset.price.toFixed(2)} ${siteConfig.currency}`}
        </span>
        <span className="text-muted-foreground text-[12px] line-through">{`$${preset.prevPrice.toFixed(2)}`}</span>
      </div>
    </label>
  );
};

export default Plan;
