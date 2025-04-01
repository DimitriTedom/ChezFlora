import { Helmet } from "react-helmet-async";

const AdminCustomers = () => {
  return (
    <div>
      <Helmet>
        <title>Customer Management | ChezFlora Admin</title>
        <meta
          name="description"
          content="Manage customer accounts, view order history, and handle user permissions."
        />
        <meta
          property="og:title"
          content="Customer Management | ChezFlora Admin"
        />
        <meta
          property="og:description"
          content="Administer ChezFlora customer accounts and access."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/admin/users"
        />
        <meta
          property="og:image"
          content="https://www.chezflora.com/images/admin-users-preview.jpg"
        />
      </Helmet>
      Customers
    </div>
  );
};

export default AdminCustomers;
