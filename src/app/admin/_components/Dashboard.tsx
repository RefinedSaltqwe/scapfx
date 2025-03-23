"use client";

import { useDashboardStore } from "@/hooks/stores/useDashboardStore";
import { lazy, useEffect } from "react";
import DashboardCard from "./DashboardCard";
const Loader = lazy(() => import("@/components/Loader"));

export default function Dashboard() {
  const { data, loading, error, fetchData } = useDashboardStore();

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  if (loading)
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader classNames="h-8 w-8 border-3 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Revenue"
          description="The total income from all sales before expenses."
          content={`$${data?.totalRevenue.toFixed(2)}`}
        />
        <DashboardCard
          title="Total Customers"
          description="The total number of unique buyers."
          content={`${data?.totalCustomers}`}
        />
        <DashboardCard
          title="Total Payments"
          description="The total number of completed transactions."
          content={`${data?.totalPayments}`}
        />
        <DashboardCard
          title="Total Subscriptions"
          description="The total number of active subscribers."
          content={`${data?.totalSubscriptions}`}
        />
      </div>

      <h2 className="mt-6 text-xl font-semibold">Recent Transactions</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Currency</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.recentTransactions.map((txn) => (
              <tr key={txn.id} className="border-t">
                <td className="px-4 py-2">{txn.id}</td>
                <td className="px-4 py-2">${txn.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{txn.currency}</td>
                <td className="px-4 py-2">{txn.created}</td>
                <td className="px-4 py-2">{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
