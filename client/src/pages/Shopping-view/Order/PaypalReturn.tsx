import FormTitle from "@/components/Common/FormTitle";
import { useCustomToast } from "@/hooks/useCustomToast";
import { capturePayment } from "@/store/shop/OrderSlice";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const PaypalReturnPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const { showToast } = useCustomToast();
  const payerId = params.get("PayerID");
  useEffect(() => {
    if (payerId && paymentId) {
      const orderId = JSON.parse(
        sessionStorage.getItem("currentOrderId") || "null"
      );
      dispatch(capturePayment({ paymentId, payerId, orderId }))
        .unwrap()
        .then((data) => {
          console.log(data, "after capture payment");
          if (data.success) {
            // sessionStorage.removeItem("currentOrderId");
            sessionStorage.setItem("currentOrderId", JSON.stringify(orderId));
            showToast({
              message: data.message,
              type: "success",
              subtitle: "Redirecting to Payment Success...",
              duration: 5000,
            });
            window.location.href = "/shop/payment-success";
          }
        });
    }
  }, [paymentId, payerId, dispatch, showToast]);
  return (
    <div className="mt-16 min-h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Order Confirmation | ChezFlora</title>
        <meta
          name="description"
          content="Your payment was successful! Review your order details and delivery timeline."
        />
        <meta property="og:title" content="Order Confirmation | ChezFlora" />
        <meta
          property="og:description"
          content="Thank you for your purchase at ChezFlora. Your order is being processed."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/shop/paypal-return"
        />
        <meta
          property="og:image"
          content="https://www.chezflora.com/images/order-confirmation-preview.jpg"
        />
      </Helmet>
      <FormTitle
        title="Paypal Processing Payment..."
        comment="Do not refresh the page"
      />
      <div className="text-lg font-semibold text-gray-600">
        If you are not redirected, click{" "}
        <Link to="/shop/pLinkyment-success">here</Link>
      </div>
    </div>
  );
};

export default PaypalReturnPage;
