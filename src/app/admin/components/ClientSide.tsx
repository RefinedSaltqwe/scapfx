"use client";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ClientSideProps = {
  children: React.ReactNode;
};

const ClientSide: React.FC<ClientSideProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user.type !== "ADMIN") {
      router.push("/unauthorized");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex h-80 items-center justify-center">
        <Loader classNames="h-8 w-8 border-3 border-primary animate-[spin_.5s_linear_infinite] brightness-100 saturate-200 !border-r-transparent" />
      </div>
    );
  }

  if (status === "authenticated" && session?.user.type !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
};

export default ClientSide;
