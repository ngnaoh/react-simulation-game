import "./App.css";
import { ThemeProvider, useTheme } from "./contexts/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { UserSessionProvider } from "./contexts/user-session-provider";
import AppRoute from "./route";

function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider defaultTheme={theme} storageKey="vite-ui-theme">
      <UserSessionProvider>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <AppRoute />
          <Toaster />
        </div>
      </UserSessionProvider>
    </ThemeProvider>
  );
}

export default App;
