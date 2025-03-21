import React from "react";
import Heading from "../components/Heading";
import ProductList from "./_components/ProductsList";

const ProductCatalogPage: React.FC = () => {
  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between">
        <Heading title="Product Catalog" subTitle="List of products" />
        {/* <CreateButton /> */}
      </div>
      <ProductList />
    </section>
  );
};
export default ProductCatalogPage;
