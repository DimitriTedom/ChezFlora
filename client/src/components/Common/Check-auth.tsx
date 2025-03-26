import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface CheckAuthProps {
  isAuthenticated: boolean;
  user: { role?: string } | null;
  children: React.ReactNode;
}

const CheckAuth = ({ isAuthenticated, user, children }: CheckAuthProps) => {
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

  if (
    !authState.isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/forgot-password") ||
      location.pathname.includes("/verify-otp") ||
      location.pathname.includes("/enter-new-password")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (authState.user === null) {
    return null;
  }

  if (
    authState.isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    if (authState.user?.role === "ADMIN" && !location.pathname.includes("/admin")) {
      return <Navigate to="/admin/dashboard" />;
    } else if (authState.user?.role !== "ADMIN" && !location.pathname.includes("/shop")) {
      return <Navigate to="/shop/home" />;
    }
  }

  if (
    authState.isAuthenticated &&
    authState.user?.role !== "ADMIN" &&
    location.pathname.includes("/admin")
  ) { 
    return <Navigate to="/unauth-page" />;
  }

  if (
    authState.isAuthenticated &&
    authState.user?.role === "ADMIN" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
