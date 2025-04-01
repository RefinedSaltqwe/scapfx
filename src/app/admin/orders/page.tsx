import React from "react";
import Heading from "../_components/Heading";

const OrdersPage: React.FC = () => {
  return (
    <section className="flex w-full flex-col">
      <div className="mb-5 flex items-center justify-between">
        <Heading title="Orders" subTitle="List of orders" />
      </div>
    </section>
  );
};
export default OrdersPage;
