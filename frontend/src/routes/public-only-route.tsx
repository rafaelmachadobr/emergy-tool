import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

type PublicOnlyRouteProps = {
  children: JSX.Element;
};

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
