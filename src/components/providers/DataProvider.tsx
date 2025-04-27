"use client";
import { useLoggedUser } from "@/hooks/stores/useLoggedUserStore";
import { usePresets } from "@/hooks/stores/usePresetsStore";
import { initFacebookPixel, trackPageView } from "@/lib/fbpixels";
import { getPresetNav } from "@/server/queries/fetch-presets-nav";
import { getUser } from "@/server/queries/fetch-user";
import { type CurrentUserPrisma } from "@/types/prisma";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"; // For App Directory
import React, { useEffect, useRef, useState } from "react";

type DataProviderProps = {
  children: React.ReactNode;
  pixel_id: string;
};

const DataProvider: React.FC<DataProviderProps> = ({ children, pixel_id }) => {
  const { data: session } = useSession();
  const addLoggedUser = useLoggedUser((state) => state.addUser);
  const addNav = usePresets((state) => state.addPresetNav);
  const pathname = usePathname();
  const [isPresetsFetched, setIsPresetsFetched] = useState(false);
  const isSessionInitialized = useRef(false);

  // Fetch user data with react-query
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery<CurrentUserPrisma | null>({
    queryKey: ["user_", session?.user.id],
    queryFn: () => getUser(session!.user.id),
    enabled: !!session,
  });

  const { data: preset_nav } = useQuery({
    queryFn: getPresetNav,
    queryKey: ["preset_nav"],
    staleTime: 300_000, // 5 minutes
  });

  useEffect(() => {
    // If the user data has been successfully fetched
    if (!userLoading && !userError && user && !isSessionInitialized.current) {
      const presetIds = user.ownedPresets.map((p) => p.presetId);
      addLoggedUser(user, presetIds);
      isSessionInitialized.current = true;
    }
  }, [user, userLoading, userError, addLoggedUser]);

  useEffect(() => {
    // Once presets are fetched, trigger the relevant actions
    if (preset_nav) {
      addNav(preset_nav);
      setIsPresetsFetched(true);
    }
  }, [addNav, preset_nav]);

  // Track page view on pathname change
  useEffect(() => {
    if (typeof window !== "undefined" && isPresetsFetched) {
      void trackPageView();
    }
  }, [pathname, isPresetsFetched]);

  return (
    <>
      <FacebookPixel pixel_id={pixel_id} />
      {children}
    </>
  );
};

// Facebook Pixel component
type FacebookPixelProps = {
  pixel_id: string;
};

const FacebookPixel: React.FC<FacebookPixelProps> = ({ pixel_id }) => {
  useEffect(() => {
    if (!pixel_id) return;
    void initFacebookPixel(pixel_id); // Use void to mark promise as ignored
    void trackPageView();
  }, [pixel_id]);

  return null;
};

export default DataProvider;
