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
import ShoppingStore from "./pages/Shopping-view/ShoppingStore";
import ShoppingAbout from "./pages/Shopping-view/ShoppingAbout";
import ShoppingContact from "./pages/Shopping-view/ShoppingContact";
import BlogPostPage from "./pages/Shopping-view/Blog/BlogPostPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/authSlice";
import { AppDispatch, RootState } from "./store/store";
import ChezFloraLoader from "./components/Common/ChezFloraLoader";
import { Skeleton } from "./components/ui/skeleton";
export default function Home() {
  // const isAuthenticated = false;
  // const user = {
  //   name: "dimitri",
  //   role: "admin",
  // };
  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .catch(() => console.log("Auth check failed"));
  }, [dispatch]);
  if (isLoading) {
    console.log(isLoading, user);
    return (
      <div>
        <ChezFloraLoader/> 
        {/* <Skeleton className="w-[800px] h-[600px] bg-black" /> */}
      </div>
    );
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
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
          <Route path="verify-otp" element={<AuthEnterOtp />} />
          <Route path="enter-new-password" element={<AuthNewPassword />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="blogs" element={<AdminBlogs />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="store" element={<ShoppingStore />} />
          <Route path="about" element={<ShoppingAbout />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="blog" element={<ShoppingBlog />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="contact" element={<ShoppingContact />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
