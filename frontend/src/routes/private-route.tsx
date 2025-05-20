import { PrivateLayout } from "@/components/layout/private-layout";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, useLocation } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}
