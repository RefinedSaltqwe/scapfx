"use client";
import { useLoggedUser } from "@/hooks/stores/useLoggedUserStore";
import { usePresets } from "@/hooks/stores/usePresetsStore";
import { initFacebookPixel, trackPageView } from "@/lib/fbpixels";
import { getPresets } from "@/server/queries/fetch-presets";
import { getUser } from "@/server/queries/fetch-user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"; // For App Directory
import React, { useEffect, useRef } from "react";

type DataProviderProps = {
  children: React.ReactNode;
  pixel_id: string;
};

const DataProvider: React.FC<DataProviderProps> = ({ children, pixel_id }) => {
  const { data: session } = useSession();
  const addLoggedUser = useLoggedUser((state) => state.addUser);
  const addAllPresets = usePresets((state) => state.addPresets);
  const pathname = usePathname(); // Get the current path

  const { data: user } = useQuery({
    queryFn: () => getUser(session!.user.id),
    queryKey: ["user_", session?.user.id],
    enabled: !!session,
  });

  // Track if session has been initialized
  const isSessionInitialized = useRef(false);

  // Fetch presets using React Query
  const { data: allPresets } = useQuery({
    queryFn: getPresets,
    queryKey: ["all_presets"],
    staleTime: 300_000, // 5 minutes
  });

  // Facebook Pixel
  useEffect(() => {
    if (!pixel_id) return; // Prevent running if no Pixel ID

    void initFacebookPixel(pixel_id); // Use void to mark promise as ignored
    void trackPageView();
  }, [pixel_id]); // Only runs once on mount

  useEffect(() => {
    if (typeof window !== "undefined") {
      void trackPageView();
    }
  }, [pathname]);

  // Fetch Presets and prices from stripe
  useEffect(() => {
    if (!allPresets?.length) return;

    addAllPresets(allPresets);
  }, [addAllPresets, allPresets]);

  useEffect(() => {
    if (user && (!isSessionInitialized.current || user !== undefined)) {
      const presetIds = user.ownedPresets.map((p) => p.presetId);

      // Initialize user data
      addLoggedUser(user, presetIds);

      // Mark session as initialized to prevent trigger on page refresh
      isSessionInitialized.current = true;
    }
  }, [user, addLoggedUser]);

  return <>{children}</>;
};

export default DataProvider;
