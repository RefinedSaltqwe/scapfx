"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

type FloatingFormSubmitBtnProps = {
  isLoading: boolean;
  type: string;
};

const FloatingFormSubmitBtn: React.FC<FloatingFormSubmitBtnProps> = ({
  isLoading,
  type,
}) => {
  const router = useRouter();
  return (
    <div className="justify bg-background border-muted-foreground/20 sticky bottom-2 flex w-full items-center justify-between rounded-md border-[1px] py-2 pr-2 pl-6 shadow-md">
      <div className="font-bold">
        {type === "update" ? "Save changes" : "New preset"}
      </div>
      <div className="flex w-56 gap-2 md:w-96">
        <Button
          type="button"
          onClick={() => router.push("/admin/product-catalog")}
          variant={"secondary"}
          className="focus-visible:outline-primary flex h-12 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold uppercase shadow-sm focus-visible:outline focus-visible:outline-offset-2"
        >
          Back
        </Button>
        <Button
          className="bg-primary hover:bg-primary focus-visible:outline-primary flex h-12 w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white uppercase shadow-sm focus-visible:outline focus-visible:outline-offset-2"
          type="submit"
        >
          {isLoading ? (
            <Loader classNames="h-4 w-4 border-2 border-white/80 animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
          ) : (
            type
          )}
        </Button>
      </div>
    </div>
  );
};
export default FloatingFormSubmitBtn;
