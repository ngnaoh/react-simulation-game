import { useUserSession } from "@/contexts/user-session-provider";
import { hasPermission } from "@/utils/permissions";
import DashboardAdmin from "@/components/dashboard-admin";
import DashboardUser from "@/components/dashboard-user";
import AppHeader from "@/components/app-header";
import { Separator } from "@/components/ui/separator";
export default function Dashboard() {
  const { session, permissions } = useUserSession();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader
        leftSection={
          <>
            <div className="flex items-center space-x-3">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold">Finsimco</h1>
                <p className="text-sm text-muted-foreground">Welcome back!</p>
              </div>
              <Separator orientation="vertical" className="!h-10" />
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">
                  {session?.user.email}
                </p>
              </div>
            </div>
          </>
        }
      />

      {hasPermission(permissions, "dashboard:view") &&
        !hasPermission(permissions, "dashboard:create") && <DashboardUser />}
      {hasPermission(permissions, "dashboard:create") && <DashboardAdmin />}
    </div>
  );
}
