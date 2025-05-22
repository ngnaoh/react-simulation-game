import type { User } from "@/type/database";
import { createContext, useContext } from "react";

type DashboardContextType = {
  users: User[];
};

const DashboardContext = createContext<DashboardContextType>({
  users: [],
});

export function DashboardAdminProvider({
  children,
  users,
}: {
  children: React.ReactNode;
  users: User[];
}) {
  return (
    <DashboardContext.Provider value={{ users }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardAdmin() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardAdmin must be used within a DashboardAdminProvider"
    );
  }
  return context;
}
