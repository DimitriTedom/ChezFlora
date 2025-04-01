import { Helmet } from "react-helmet-async";

const AdminQuotes = () => {
  return (
    <div>
      <Helmet>
        <title>Quote Requests | ChezFlora Admin</title>
        <meta
          name="description"
          content="Review and respond to custom decoration quote requests for events and weddings."
        />
        <meta property="og:title" content="Quote Requests | ChezFlora Admin" />
        <meta
          property="og:description"
          content="Manage custom decoration quotes for ChezFlora clients."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/admin/quotes"
        />
        <meta
          property="og:image"
          content="https://www.chezflora.com/images/admin-quotes-preview.jpg"
        />
      </Helmet>
      Quotes
    </div>
  );
};

export default AdminQuotes;
