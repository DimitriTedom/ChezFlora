import { Helmet } from "react-helmet-async";

const ShoppingAccount = () => {
  return (
    <div>
      <Helmet>
        <title>My Account - ChezFlora Client Dashboard</title>
        <meta
          name="description"
          content="Manage your orders, delivery addresses, and subscription preferences. Track past orders and update your profile."
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Client Dashboard - ChezFlora" />
        <meta
          property="og:description"
          content="Access your order history, update preferences, and customize your floral subscription."
        />
        <meta property="og:image" content="/assets/og-account.jpg" />{" "}
        {/* Dashboard UI mockup */}
      </Helmet>
      <div className="mt-32">Shopping view Account page</div>
    </div>
  );
};

export default ShoppingAccount;
