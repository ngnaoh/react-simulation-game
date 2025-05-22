import { GalleryVerticalEnd, Moon, Sun } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { useTheme } from "@/contexts/theme-provider";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Finsimco
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? (
              <Moon className="size-5" />
            ) : (
              <Sun className="size-5" />
            )}
          </Button>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
