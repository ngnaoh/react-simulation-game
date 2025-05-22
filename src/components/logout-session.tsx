import { Button } from "./ui/button";
import { LogOut, MoonIcon, SunIcon } from "lucide-react";
import { useUserSession } from "@/contexts/user-session-provider";
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
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-4">
        <p>{session?.user.user_metadata.username}</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      {!confirmWhenLoggingOut ? (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={handleLogoutClick}>
          Logout <LogOut className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground cursor-pointer">
              Logout <LogOut className="ml-2 h-4 w-4" />
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
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
  );
};

export default LogoutSession;
