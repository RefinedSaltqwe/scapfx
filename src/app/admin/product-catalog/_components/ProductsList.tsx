"use client";
import React, { Suspense } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { usePresets } from "@/hooks/stores/usePresets";
import Loader from "@/components/Loader";

const ProductList: React.FC = () => {
  const data = usePresets((state) => state.presets);
  return (
    <Suspense
      fallback={
        <div className="flex h-80 items-center justify-center">
          <Loader classNames="h-8 w-8 border-3 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
        </div>
      }
    >
      <DataTable columns={columns} data={data ?? []} presets={data ?? []} />
    </Suspense>
  );
};
export default ProductList;
