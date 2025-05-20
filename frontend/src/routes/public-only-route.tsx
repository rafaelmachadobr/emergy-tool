import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

type PublicOnlyRouteProps = {
  children: JSX.Element;
};

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
