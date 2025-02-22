"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { plans, supportedSoftwares } from "@/data";
import React, { useState } from "react";
import Plan from "./Plan";

type ProductProps = {
  x?: string;
};

const Product: React.FC<ProductProps> = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>(
    plans.find((plan) => plan.selected)?.name ?? "",
  );

  const handlePlanChange = (name: string) => setSelectedPlan(name);

  return (
    <section className="mt-[-30px] flex w-full flex-col sm:flex-row">
      <div className="bg-primary relative !z-20 flex flex-1 justify-end rounded-t-md border-t-5 border-amber-700 p-6 pb-4 sm:rounded-tl-none sm:rounded-r-md">
        <Avatar className="border-border absolute top-[-60px] left-1/2 z-30 h-28 w-28 -translate-x-1/2 transform border-5">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="mt-8 flex max-w-2xl flex-col justify-center gap-4 sm:mt-0">
          <span className="text-primary-foreground text-sm">NO. 01</span>
          <span className="text-muted-foreground text-5xl font-bold">
            ZENITH
          </span>
          <p className="text-muted-foreground text-md">
            {`This pack is a nod to the past and present. It is the perfect blend between an older film-style aesthetic and a newer cinematic softness, bringing story to your photos. Both presets are versatile and allow you to edit to your liking while keeping that distinctive style it gives. Whether you'd like to fine-tune your color foundation or transition to black and white, these presets will propel your work into a developed style.`}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 pt-6 pb-6 sm:pt-14">
        <span className="text-sm">Available Packs</span>
        <fieldset
          aria-label="Available Packs"
          className="bg-background relative max-w-2xl -space-y-px rounded-md"
        >
          {plans.map((plan) => (
            <Plan
              key={plan.name}
              plan={plan}
              selectedPlan={selectedPlan}
              onChange={handlePlanChange}
            />
          ))}
        </fieldset>

        <Button className="mt-8 h-12 max-w-2xl">ADD TO CART</Button>
        <div className="border-muted mt-10 border-t pt-10">
          <h3 className="text-primary text-sm font-medium">
            Supported Software
          </h3>
          <div className="mt-4">
            <ul
              role="list"
              className="text-muted-foreground marker:text-muted-foreground list-disc space-y-1 pl-5 text-sm/6"
            >
              {supportedSoftwares.map((highlight) => (
                <li key={highlight} className="pl-2">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
