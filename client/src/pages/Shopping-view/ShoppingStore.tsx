import React from "react";
import { Helmet } from "react-helmet-async";

const ShoppingStore = () => {
  return (
    <div>
      <Helmet>
        <title>Find a Store - ChezFlora Locations</title>
        <meta
          name="description"
          content="Visit our physical store or schedule a consultation for custom floral design. Open Monday-Saturday. Free in-store pickup available."
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content="ChezFlora Store Locator" />
        <meta
          property="og:description"
          content="Discover our boutique locations and schedule an in-person consultation for your event or home décor needs."
        />
        <meta property="og:image" content="/assets/og-store.jpg" />{" "}
        {/* Store exterior photo */}
      </Helmet>
      
      <div className="mt-32">
      ShoppingStore
      </div>
    </div>
  );
};

export default ShoppingStore;
