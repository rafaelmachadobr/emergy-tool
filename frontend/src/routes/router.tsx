import CalculatePage from "@/pages/CalculatePage";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import ImportDataPage from "../pages/ImportDataPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import { PrivateRoute } from "./private-route";
import { PublicOnlyRoute } from "./public-only-route";
import HelpPage from "@/pages/HelpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
