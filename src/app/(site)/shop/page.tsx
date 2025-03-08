import { redirect } from "next/navigation";
import React from "react";

const ShopPage: React.FC = () => {
  redirect("/shop/aether");
  return <div>Have a good coding</div>;
};
export default ShopPage;
