import LogoutSession from "./logout-session";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type AppHeaderProps = {
  leftSection: React.ReactNode;
  rightSection?: React.ReactNode;
  confirmWhenLoggingOut?: boolean;
  className?: string;
};

const AppHeader = ({
  leftSection,
  rightSection,
  confirmWhenLoggingOut = false,
  className,
}: AppHeaderProps) => {
  return (
    <header
      className={cn(
        "flex flex-row justify-start items-center sm:justify-between sm:flex-row sm:items-center gap-4 sm:gap-0 mb-8 pb-4 border-b border-border bg-background/50 backdrop-blur-sm rounded-lg py-4",
        className
      )}>
      <div className="hidden sm:block w-full sm:w-auto space-y-3">
        {leftSection}
      </div>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild className="sm:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-3">
          <div className="mt-4 space-y-3">
            {leftSection}
            <div className="pt-4 border-t flex flex-row justify-between items-center">
              <LogoutSession confirmWhenLoggingOut={confirmWhenLoggingOut} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold sm:hidden">Finsimco</h1>
      </div>

      <div className="hidden sm:flex w-full sm:w-auto justify-end">
        {rightSection ?? (
          <LogoutSession confirmWhenLoggingOut={confirmWhenLoggingOut} />
        )}
      </div>
    </header>
  );
};

export default AppHeader;
