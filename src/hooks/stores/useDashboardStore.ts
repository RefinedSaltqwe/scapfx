import { create } from "zustand";

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  created: string;
  status: string;
}

interface DashboardData {
  totalRevenue: number;
  totalCustomers: number;
  totalPayments: number;
  totalSubscriptions: number;
  recentTransactions: Transaction[];
}

interface DashboardStore {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,
  fetchData: async () => {
    if (get().data) return;

    set({ loading: true, error: null });

    try {
      const res = await fetch("/api/stripe/overview");
      if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);

      const jsonData: DashboardData = (await res.json()) as {
        totalRevenue: number;
        totalCustomers: number;
        totalPayments: number;
        totalSubscriptions: number;
        recentTransactions: Transaction[];
      };
      set({ data: jsonData });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "An unknown error occurred.",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
