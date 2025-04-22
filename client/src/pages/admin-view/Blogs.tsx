import { Helmet } from "react-helmet-async";

const AdminBlogs = () => {
  return (
    <div>
      <Helmet>
        <title>Blog Management | ChezFlora Admin</title>
        <meta
          name="description"
          content="Create, edit, or publish blog articles about floral trends, care tips, and event inspiration."
        />
        <meta property="og:title" content="Blog Management | ChezFlora Admin" />
        <meta
          property="og:description"
          content="Manage ChezFlora's blog content and user comments."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chez-flora-sigma.vercel.app" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <meta
          property="og:image"
          content="https://chez-flora-sigma.vercel.app/flowerGen5.jpg"
        />
      </Helmet>
      AdminBlogs
    </div>
  );
};

export default AdminBlogs;
