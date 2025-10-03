import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  user: { role?: string } | null;
  children?: React.ReactNode;
  fallbackPath?: string;
}

const ProtectedRoute = ({ 
  isAuthenticated, 
  user, 
  children, 
  fallbackPath = "/auth/login" 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const [authState, setAuthState] = useState({
    isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") || "false"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(user));
      setAuthState({ isAuthenticated: true, user });
    } else if (!isAuthenticated) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      setAuthState({ isAuthenticated: false, user: null });
    }
  }, [isAuthenticated, user]);

  // If user is not authenticated, redirect to login with return path
  if (!authState.isAuthenticated) {
    return <Navigate to={`${fallbackPath}?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Admin trying to access non-admin routes
  if (
    authState.isAuthenticated &&
    authState.user?.role === "ADMIN" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Non-admin trying to access admin routes
  if (
    authState.isAuthenticated &&
    authState.user?.role !== "ADMIN" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;