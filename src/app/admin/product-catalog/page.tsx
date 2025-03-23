import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Heading from "../_components/Heading";
import ProductList from "./_components/ProductsList";

const ProductCatalogPage: React.FC = () => {
  return (
    <section className="flex w-full flex-col">
      <div className="mb-5 flex items-center justify-between">
        <Heading title="Product Catalog" subTitle="List of products" />
        <div className="flex flex-col gap-y-1 py-3">
          <Button asChild>
            <Link href="/admin/product-catalog/create">Create Preset</Link>
          </Button>
        </div>
      </div>
      <ProductList />
    </section>
  );
};
export default ProductCatalogPage;
