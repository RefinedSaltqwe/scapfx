import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  maxWidth: "sm" | "md" | "lg" | "full";
  bgColor?: string;
};

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth,
  bgColor = "bg-background",
}) => {
  return (
    <div className={cn("w-full", bgColor)}>
      <div
        className={cn(
          "mx-auto px-6 lg:px-8",
          maxWidth == "sm"
            ? "max-w-6xl"
            : maxWidth == "md"
              ? "max-w-7xl"
              : maxWidth == "lg"
                ? "max-w-[1550px]"
                : "max-w-full",
        )}
      >
        {children}
      </div>
    </div>
  );
};
export default Container;
