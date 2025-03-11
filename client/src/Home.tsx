import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import AuthLogin from "./pages/Auth/Login";
import AuthRegister from "./pages/Auth/Register";
import AdminLayout from "./components/Admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminBlogs from "./pages/admin-view/Blogs";
import AdminFeatures from "./pages/admin-view/Features";
import AdminOrders from "./pages/admin-view/Orders";
import AdminProducts from "./pages/admin-view/Products";
import ShoppingLayout from "./components/Shopping-view/Layout";
import NotFound from "./pages/Not-Found";
import ShoppingHome from "./pages/Shopping-view/Home";
import ShoppingListing from "./pages/Shopping-view/Listing";
import ShoppingCheckout from "./pages/Shopping-view/Checkout";
import ShoppingAccount from "./pages/Shopping-view/Account";
import ShoppingBlog from "./pages/Shopping-view/Blog";
import CheckAuth from "./components/Common/Check-auth";
import UnAuthPage from "./pages/UnAuthPAge";
import AuthForgotPassword from "./pages/Auth/ForgotPassword";
import AuthEnterOtp from "./pages/Auth/EnterOTP";
import AuthNewPassword from "./pages/Auth/EnterNewPassword";

export default function Home() {
  const isAuthenticated = false;
  const user = {
    name: "dimitri",
    role: "user"
  };
  return (
    <div>
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="forgot-password" element={<AuthForgotPassword />} />
          <Route path="verify-otp" element={<AuthEnterOtp/>}/>
          <Route path="enter-new-password" element={<AuthNewPassword/>}/>
        </Route>
        <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="blogs" element={<AdminBlogs />} />
        </Route>
        <Route path="/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="blog" element={<ShoppingBlog />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />        
        <Route path="*" element={<NotFound />} />        
      </Routes>
    </div>
  );
}
