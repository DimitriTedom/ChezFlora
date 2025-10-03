import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface CheckAuthProps {
  isAuthenticated: boolean;
  user: { role?: string } | null;
  children?: React.ReactNode;
  requireAuth?: boolean; // New prop to determine if auth is required
}
 
const CheckAuth = ({ 
  isAuthenticated, 
  user, 
  children, 
  requireAuth = false 
}: CheckAuthProps) => {
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

  // Handle root path redirection
  if (location.pathname === '/') {
    if (authState.isAuthenticated) {
      if (authState.user?.role === "ADMIN") {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/shop/home" replace />;
      }
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  // If authentication is required but user is not authenticated
  if (
    requireAuth &&
    !authState.isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/forgot-password") ||
      location.pathname.includes("/verify-otp") ||
      location.pathname.includes("/complete") ||
      location.pathname.includes("/enter-new-password")
    )
  ) {
    return <Navigate to={`/auth/login?returnTo=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Redirect authenticated users away from auth pages
  if (
    authState.isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    if (authState.user?.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  // Admin access control
  if (
    authState.isAuthenticated &&
    authState.user?.role !== "ADMIN" &&
    location.pathname.includes("/admin")
  ) { 
    return <Navigate to="/unauth-page" replace />;
  }

  // Prevent admin from accessing shop routes (they have their own dashboard)
  if (
    authState.isAuthenticated &&
    authState.user?.role === "ADMIN" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default CheckAuth;
