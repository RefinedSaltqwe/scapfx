import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";

const plans = [
  {
    name: "01. ZENITH",
    price: "$15.00",
    prevPrice: "$35.00",
    selected: true,
  },
  {
    name: "02. AETHER",
    price: "$15.00",
    prevPrice: "$35.00",
    selected: false,
  },
  {
    name: "03. ETHEREA",
    price: "$15.00",
    prevPrice: "$35.00",
    selected: false,
  },
];

const product = {
  highlights: [
    "Adobe® Lightroom® 4 or later (Classic)",
    "Adobe® Camera Raw 10.3 or later",
    "Adobe® Lightroom® CC Desktop 1.4 or later and Mobile (Non-Classic)",
  ],
};

type ProductProps = {
  x?: string;
};

const Product: React.FC<ProductProps> = () => {
  return (
    <section className="mt-[-30px] flex w-full flex-col sm:flex-row">
      <div className="bg-primary relative !z-20 flex flex-1 justify-end rounded-t-md border-t-5 border-amber-700 p-6 pb-4 sm:rounded-tl-none sm:rounded-r-md">
        <Avatar className="border-border absolute top-[-60px] right-[40%] z-30 h-28 w-28 border-5 sm:right-[20%]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="text-primary-foreground text-sm">NO. 01</span>
          <span className="text-muted-foreground text-5xl font-bold">
            ZENITH
          </span>
          <p className="text-muted-foreground text-md">{`This pack is a nod to the past and present. It is the perfect blend between an older film-style aesthetic and a newer cinematic softness, bringing story to your photos. Both presets are versatile and allow you to edit to your liking while keeping that distinctive style it gives. Whether you'd like to fine-tune your color foundation or transition to black and white, these presets will propel your work into a developed style.`}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 pt-6 pb-6 sm:pt-14">
        <span className="text-sm">Available Packs</span>
        <fieldset
          aria-label="Available Packs"
          className="bg-background relative max-w-2xl -space-y-px rounded-md"
        >
          {plans.map((plan) => (
            <label
              key={plan.name}
              aria-label={plan.name}
              aria-description={`${plan.price}`}
              className="group border-border has-[:checked]:border-primary has-[:checked]:bg-primary/10 flex cursor-pointer flex-col border p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-br-md last:rounded-bl-md focus:outline-none has-[:checked]:relative md:grid md:grid-cols-2 md:pr-6 md:pl-4"
            >
              <span className="flex items-center gap-3 text-sm">
                <input
                  defaultValue={plan.name}
                  defaultChecked={plan.selected}
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
              {product.highlights.map((highlight) => (
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
