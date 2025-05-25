import CalculatePage from "@/pages/CalculatePage";
import DashboardPage from "@/pages/DashboardPage";
import HelpPage from "@/pages/HelpPage";
import ImportDataPage from "@/pages/import-data-page";
import LandingPage from "@/pages/landing-page";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./private-route";
import { PublicOnlyRoute } from "./public-only-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicOnlyRoute>
        <RegisterPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/import",
    element: (
      <PrivateRoute>
        <ImportDataPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/calculate",
    element: (
      <PrivateRoute>
        <CalculatePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <PrivateRoute>
        <HelpPage />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
