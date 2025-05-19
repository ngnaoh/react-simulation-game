import { Route, Routes } from "react-router";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import LoginPage from "./pages/auth/login";
import Structuring from "./pages/stages/structuring";
import Analysis from "./pages/stages/analysis";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="stage">
          <Route path="structuring" element={<Structuring />} />
          <Route path="analysis" element={<Analysis />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
