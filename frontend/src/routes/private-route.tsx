import { PrivateLayout } from "@/components/layout/private-layout";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}
