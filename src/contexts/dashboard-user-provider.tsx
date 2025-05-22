import { supabase } from "@/utils/supabaseClient";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useUserSession } from "./user-session-provider";
import { useNavigate } from "react-router";

const DashboardContext = createContext({});

export function DashboardUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { session } = useUserSession();
  const [hasNewSimulation, setHasNewSimulation] = useState(false);
  const [isUserHasATeam, setIsUserHasATeam] = useState(false);
  const redirectUrl = useRef("");

  useEffect(() => {
    const subscription = supabase
      .channel("listen-start-simulations")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "users_team",
          filter: `user_id=eq.${session?.user.id}`,
        },
        (payload) => {
          if (payload.new.user_id === session?.user.id) {
            setIsUserHasATeam(true);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "simulations",
        },
        (payload) => {
          if (payload.new.id) {
            setHasNewSimulation(true);
            redirectUrl.current = `simulation/${payload.new.id}`;
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [session]);

  useEffect(() => {
    if (isUserHasATeam && hasNewSimulation) {
      navigate(`/${redirectUrl.current}`);
    }
  }, [isUserHasATeam, hasNewSimulation, navigate]);

  return (
    <DashboardContext.Provider value={{}}>{children}</DashboardContext.Provider>
  );
}

export function useDashboardUser() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardUser must be used within a DashboardUserProvider"
    );
  }
  return context;
}
