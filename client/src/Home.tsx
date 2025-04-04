import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import AuthLogin from "./pages/Auth/Login";
import AuthRegister from "./pages/Auth/Register";
import AdminLayout from "./components/Admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminBlogs from "./pages/admin-view/Blogs";
import AdminOrders from "./pages/admin-view/Orders";
import AdminProducts from "./pages/admin-view/Products";
import ShoppingLayout from "./components/Shopping-view/Layout";
import NotFound from "./pages/Not-Found";
import ShoppingHome from "./pages/Shopping-view/Home";
import ShoppingCheckout from "./pages/Shopping-view/Checkout";
import ShoppingAccount from "./pages/Shopping-view/Account";
import ShoppingBlog from "./pages/Shopping-view/Blog";
import CheckAuth from "./components/Common/Check-auth";
import UnAuthPage from "./pages/UnAuthPAge";
import AuthEnterOtp from "./pages/Auth/EnterOTP";
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
import AdminQuotes from "./pages/admin-view/Quotes";
import AdminCustomers from "./pages/admin-view/Customers";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EnterNewPassword from "./pages/Auth/EnterNewPassword";
import ShoppingProductDetail from "./pages/Shopping-view/ShoppingProductDetail";
import PaypalReturnPage from "./pages/Shopping-view/Order/PaypalReturn";
import PaymentSuccessPage from "./pages/Shopping-view/Order/PaymentSuccess";
import SearchPage from "./pages/Shopping-view/Product/SearchPage";
import CompleteRegistrationOTP from "./pages/Auth/CompleteRegistrationOTP";
import MyBookings from "./pages/Shopping-view/MyBookings";
import AdminAccount from "./pages/admin-view/AdminAccount";
export default function Home() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .catch((error) => console.log("Auth check failed", error));
  }, [dispatch]);
  if (isLoading) {
    return (
      <div>
        <ChezFloraLoader />
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
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            </CheckAuth>
          }
        />

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="complete/:email" element={<CompleteRegistrationOTP/>}/>
          <Route path="verify-otp/:email" element={<AuthEnterOtp />} />
          <Route
            path="enter-new-password/:email"
            element={<EnterNewPassword />}
          />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route index path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="account" element={<AdminAccount />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="users" element={<AdminCustomers />} />
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
          <Route path="store" element={<ShoppingStore />} />
          <Route path="detail/:id" element={<ShoppingProductDetail />} />
          <Route path="about" element={<ShoppingAbout />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="blog" element={<ShoppingBlog />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="contact" element={<ShoppingContact />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
