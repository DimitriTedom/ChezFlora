import { Helmet } from "react-helmet-async";

const ShoppingCheckout = () => {
  return (
    <div>
      <Helmet>
        <title>Secure Checkout - ChezFlora Payment</title>
        <meta
          name="description"
          content="Complete your order securely with fast delivery. Choose from credit card, PayPal, or bank transfer. Free shipping on orders over €50."
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content="ChezFlora Payment & Delivery" />
        <meta
          property="og:description"
          content="Fast, secure payment options and eco-friendly packaging. Track your order in real-time."
        />
        <meta property="og:image" content="/assets/og-checkout.jpg" />{" "}
        {/* Payment confirmation mockup */}
      </Helmet>
      <div>Shopping view Checkout page</div>
    </div>
  );
};

export default ShoppingCheckout;
