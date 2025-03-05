"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type QueryProviderProps = {
  children: React.ReactNode;
};

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // Keeps the data fresh for 5 minutes (1000ms * 60 sec * 5min)
            refetchInterval: 5 * 60 * 1000, // Refetches data every 5 minutes
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default QueryProvider;
