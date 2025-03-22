import React from "react";
import Heading from "../components/Heading";
import ProductList from "./_components/ProductsList";
import { Button } from "@/components/ui/button";

const ProductCatalogPage: React.FC = () => {
  return (
    <section className="flex w-full flex-col">
      <div className="mb-5 flex items-center justify-between">
        <Heading title="Product Catalog" subTitle="List of products" />
        <div className="flex flex-col gap-y-1 py-3">
          <Button>Create Product</Button>
        </div>
      </div>
      <ProductList />
    </section>
  );
};
export default ProductCatalogPage;
