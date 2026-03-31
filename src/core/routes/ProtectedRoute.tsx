import { Navigate } from "react-router-dom";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export const ProtectedRoute = ({
  component: Component,
}: {
  component: React.ElementType;
}) => {
  const { user, isAuthenticated } = useAuth();

  return isAuthenticated && user ? (
    <Component />
  ) : (
    <Navigate to="/login" replace />
  );
};
