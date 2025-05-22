import "./App.css";
import { ThemeProvider, useTheme } from "./contexts/theme-provider";
import { Toaster } from "./components/ui/sonner";
import AppRoute from "./route";
import { UserSessionProvider } from "./contexts/user-session-provider";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider defaultTheme={theme} storageKey="vite-ui-theme">
      <UserSessionProvider>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 min-h-screen">
          <AppRoute />
          <Toaster />
        </div>
      </UserSessionProvider>
    </ThemeProvider>
  );
}

export default App;
