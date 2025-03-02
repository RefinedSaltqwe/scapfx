"use client";
import { useLoggedUser } from "@/hooks/stores/useLoggedUser";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const addLoggedUser = useLoggedUser((state) => state.addUser);

  // Update logged user when session data changes
  useEffect(() => {
    if (session) {
      addLoggedUser(session.user.currentUser.user, session.user.ownedPresets);
    }
  }, [session, addLoggedUser]);
  return <>{children}</>;
};
export default DataProvider;
