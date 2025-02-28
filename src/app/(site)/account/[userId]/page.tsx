// app/dashboard/page.tsx
import getServerSession from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/server/auth/config";

export default async function Dashboard() {
  const session = getServerSession(authConfig);
  console.log(session);

  if (!session) {
    redirect("/login"); // Redirects the user if not authenticated
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.auth.name}</p>
    </div>
  );
}
