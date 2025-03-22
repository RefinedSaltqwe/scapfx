"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@headlessui/react";
import { type BeforeAfter } from "@prisma/client";
import { Trash2 } from "lucide-react";
import React from "react";

type ComparisonInputsProps = {
  data: BeforeAfter;
  index: number;
  count: number;
  setComparisonImages: React.Dispatch<React.SetStateAction<BeforeAfter[]>>;
};

const ComparisonInputs: React.FC<ComparisonInputsProps> = ({
  data,
  index,
  count,
  setComparisonImages,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <Label htmlFor={`before` + index}>Before</Label>
        <Input
          type="text"
          onFocus={(e) => e.target.select()}
          id={`before` + index}
          value={data.beforeImage}
          onChange={(e) => {
            setComparisonImages((prev) => [
              ...prev.map((item, idx) =>
                index === idx
                  ? {
                      ...item,
                      beforeImage: e.target.value,
                    }
                  : item,
              ),
            ]);
          }}
          autoComplete="before"
          placeholder="Image Link"
          className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
        />
      </div>

      <div className="flex-1">
        <Label htmlFor={`after` + index}>After</Label>
        <Input
          type="text"
          onFocus={(e) => e.target.select()}
          id={`after` + index}
          value={data.afterImage}
          onChange={(e) => {
            setComparisonImages((prev) => [
              ...prev.map((item, idx) =>
                index === idx
                  ? {
                      ...item,
                      afterImage: e.target.value,
                    }
                  : item,
              ),
            ]);
          }}
          autoComplete="after"
          placeholder="Image Link"
          className="bg-background text-primary focus:outline-primary block h-12 w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
        />
      </div>

      <div className="flex items-center justify-end">
        <Button
          type="button"
          className="hover:!bg-destructive/20 rounded-full"
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setComparisonImages((prev) => [
              ...prev.filter((item, idx) => index !== idx),
            ]);
          }}
          disabled={count == 1 && index == 0}
        >
          <span className="sr-only">Delete Service</span>
          <Trash2 className="text-destructive" size={20} />
        </Button>
      </div>
    </div>
  );
};
export default ComparisonInputs;
