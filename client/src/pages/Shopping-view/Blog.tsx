import { Helmet } from "react-helmet-async";

const ShoppingBlog = () => {
  return (
    <div>
      <Helmet>
        <title>ChezFlora Blog - Floral Tips & Trends</title>
        <meta
          name="description"
          content="Read expert guides on flower care, event decoration ideas, and eco-friendly gardening tips. Stay inspired for your next project."
        />
        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Floral Inspiration - ChezFlora Blog"
        />
        <meta
          property="og:description"
          content="Learn how to care for your plants, design weddings, and follow the latest floral trends."
        />
        <meta property="og:image" content="/assets/og-blog.jpg" />{" "}
        {/* Blog post cover image */}
      </Helmet>
      <div>ShoppingBlog</div>
    </div>
  );
};

export default ShoppingBlog;
