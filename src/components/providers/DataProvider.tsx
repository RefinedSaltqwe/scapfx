"use client";
import { useLoggedUser } from "@/hooks/stores/useLoggedUser";
import { usePresets } from "@/hooks/stores/usePresets";
import { getPresets } from "@/server/queries/fetch-presets";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const addLoggedUser = useLoggedUser((state) => state.addUser);
  const addAllPresets = usePresets((state) => state.addPreset);

  // Fetch presets using React Query
  const { data: allPresets } = useQuery({
    queryFn: getPresets,
    queryKey: ["all_presets_"],
    staleTime: 5 * 60 * 1000, // Cache presets for 5 minutes
  });

  useEffect(() => {
    if (allPresets?.length) {
      addAllPresets(allPresets);
    }
  }, [addAllPresets, allPresets]);

  useEffect(() => {
    if (session?.user) {
      addLoggedUser(session.user.currentUser.user, session.user.ownedPresets);
    }
  }, [session, addLoggedUser]);

  return <>{children}</>;
};

export default DataProvider;
