"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

type AccountPageContentsProps = {
  x?: string;
};

const AccountPageContents: React.FC<AccountPageContentsProps> = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect("/login"); // Redirects the user if not authenticated
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  );
};
export default AccountPageContents;
