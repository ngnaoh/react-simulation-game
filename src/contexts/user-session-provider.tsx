import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "sonner";
import { getSession } from "@/services/user";

type UserSessionContextType = {
  session: Session | null | undefined;
  permissions: string;
  loading: boolean;
  handleLogout: () => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
};

const UserSessionContext = createContext<UserSessionContextType>({
  session: null,
  permissions: "",
  loading: true,
  handleLogout: async () => {},
  handleLogin: async () => {},
});

export function UserSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] =
    useState<UserSessionContextType["session"]>(undefined);
  const [permissions, setPermissions] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((data) => {
      if (data && !data?.error) {
        setSession(data.session);
        setPermissions(data.permissions);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setLoading(true);
    toast.loading("Logging in...");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    getSession().then((data) => {
      if (data && !data?.error) {
        setSession(data.session);
        setPermissions(data.permissions);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    if (error) {
      toast.dismiss();
      toast.error(error.message);
    } else {
      toast.dismiss();
      toast.success("Login Successful");
    }
  }, []);

  return (
    <UserSessionContext.Provider
      value={{ session, permissions, loading, handleLogout, handleLogin }}>
      {children}
    </UserSessionContext.Provider>
  );
}

export function useUserSession() {
  const context = useContext(UserSessionContext);
  if (context === undefined) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
}
