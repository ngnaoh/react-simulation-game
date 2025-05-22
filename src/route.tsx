import { Routes, Navigate, Route } from "react-router";
import LoginPage from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import { useUserSession } from "./contexts/user-session-provider";
import Simulation from "./pages/simulation";

const AppRoute = () => {
  const { session } = useUserSession();
  const isUnauthenticated = session === null;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isUnauthenticated ? <LoginPage /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/dashboard"
        element={!isUnauthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        index
        element={<Navigate to={!isUnauthenticated ? "/dashboard" : "/login"} />}
      />
      <Route
        path="/simulation/:simulationId"
        element={!isUnauthenticated ? <Simulation /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoute;
