import React from "react";
import ClientSide from "./components/ClientSide";
import Sidebar from "./components/Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <ClientSide>
      <Sidebar>{children}</Sidebar>
    </ClientSide>
  );
};
export default DashboardLayout;
