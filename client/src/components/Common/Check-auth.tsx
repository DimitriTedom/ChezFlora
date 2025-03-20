import { Navigate, useLocation } from "react-router-dom";
interface CheckAuthProps {
  isAuthenticated: boolean;
  user: {
    role?: string;
  } | null;
  children: React.ReactNode;
}
const CheckAuth = ({ isAuthenticated, user, children }: CheckAuthProps) => {
  const location = useLocation();
  if (
    !isAuthenticated &&
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

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== "ADMIN" &&
    location.pathname.includes("/admin")
  ) { 
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenticated &&
    user?.role == "ADMIN" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
