import { supabase } from "@/utils/supabaseClient";

export async function getSession() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data } = await supabase
      .from("profiles")
      .select("permissions")
      .eq("id", session?.user.id)
      .single();

    if (session) {
      return {
        error: null,
        session,
        permissions: data?.permissions as string,
      };
    }
    return null;
  } catch (error) {
    return { error: error as Error, session: null, permissions: "" };
  }
}
