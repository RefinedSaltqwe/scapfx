import React from "react";
import Dashboard from "../_components/Dashboard";
import Heading from "../_components/Heading";

const DashboardPage: React.FC = () => {
  return (
    <section className="flex w-full flex-col">
      <div className="mb-5 flex items-center justify-between">
        <Heading title="Dashboard" subTitle="Stripe Dashboard Overview" />
      </div>
      <Dashboard />
    </section>
  );
};
export default DashboardPage;
