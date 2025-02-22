import { Skeleton } from "@/components/ui/skeleton";
import { type plans } from "@/data";
import React, { useEffect, useState } from "react";

type PlanProps = {
  plan: (typeof plans)[0];
  selectedPlan: string;
  onChange: (name: string) => void;
};

const Plan: React.FC<PlanProps> = ({ plan, selectedPlan, onChange }) => {
  // Ensure state only applies on the client after mounting
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="mb-2 h-14 w-full rounded-md" />;
  }

  return (
    <label
      key={plan.name}
      aria-label={plan.name}
      aria-description={plan.price}
      className="group border-border has-[:checked]:border-primary has-[:checked]:bg-primary/10 flex cursor-pointer flex-col border p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-none has-[:checked]:relative md:grid md:grid-cols-2 md:pr-6 md:pl-4"
    >
      <span className="flex items-center gap-3 text-sm">
        <input
          value={plan.name}
          checked={selectedPlan === plan.name}
          onChange={() => onChange(plan.name)}
          name="pricing-plan"
          type="radio"
          className="border-border checked:border-primary checked:bg-primary focus-visible:outline-primary disabled:border-border bg-background disabled:bg-muted relative size-4 appearance-none rounded-full border before:absolute before:inset-1 before:rounded-full before:bg-white focus-visible:outline focus-visible:outline-offset-2 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
        />
        <span className="group-has-[:checked]:text-primary text-muted-foreground font-medium">
          {plan.name}
        </span>
      </span>
      <span className="group-has-[:checked]:text-primary text-muted-foreground ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right">
        {plan.price}
      </span>
    </label>
  );
};

export default Plan;
