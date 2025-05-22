import { Button } from "./ui/button";
import { LogOut, MoonIcon, SunIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { useTheme } from "@/contexts/theme-provider";
import { useUserSession } from "@/contexts/user-session-provider";

type LogoutSessionProps = {
  confirmWhenLoggingOut?: boolean;
};

const LogoutSession = ({
  confirmWhenLoggingOut = false,
}: LogoutSessionProps) => {
  const { theme, setTheme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { session, handleLogout } = useUserSession();
  const handleLogoutClick = () => {
    setIsDialogOpen(false);
    handleLogout();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex flex-col w-full space-y-2 sm:space-y-0">
        <p className="text-sm font-medium w-max">
          {session?.user.user_metadata.username}
        </p>
        <p className="text-sm text-muted-foreground w-max sm:hidden">
          {session?.user.email}
        </p>
        <div className="h-px bg-border sm:hidden" />
      </div>

      <div className="flex flex-col w-full space-y-2 sm:space-y-0 sm:mr-0">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex justify-start text-muted-foreground hover:text-foreground !px-0 sm:!px-2"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <>
              <SunIcon className="mr-2 sm:mr-0 h-4 w-4" />
              <p className="sm:hidden">Light Mode</p>
            </>
          ) : (
            <>
              <MoonIcon className="mr-2 sm:mr-0 h-4 w-4" />
              <p className="sm:hidden">Dark Mode</p>
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col w-full space-y-2 sm:space-y-0">
        {!confirmWhenLoggingOut ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-foreground !px-0 sm:!px-2"
            onClick={handleLogoutClick}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground !px-0 sm:!px-2">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogDescription>
                  Are you sure you want to sign out while the simulation is
                  running? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleLogoutClick}>
                  Sign Out
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
export default LogoutSession;
