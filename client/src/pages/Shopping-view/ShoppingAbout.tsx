import { Helmet } from "react-helmet-async";

const ShoppingAbout = () => {
  return (
    <div>
      <Helmet>
        <title>About ChezFlora - Our Story & Eco-Commitment</title>
        <meta
          name="description"
          content="Since 2016, ChezFlora has crafted artisanal floral designs with eco-responsible practices. Learn about our values and local partnerships."
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Our Story - ChezFlora" />
        <meta
          property="og:description"
          content="A passion for nature and sustainability drives our floral creations. Read our journey and eco-pledges."
        />
        <meta property="og:image" content="/assets/og-about.jpg" />{" "}
        {/* Team or workshop photo */}
      </Helmet>
      <div className="mt-32">This is the ShoppingAbout page</div>
    </div>
  );
};

export default ShoppingAbout;
