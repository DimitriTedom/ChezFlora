import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AdminQuotes from "./Quotes";
import { AppDispatch, RootState } from "@/store/store";
import { getAllUsers } from "@/store/admin/UserSlice";
import { getAllOrdersofAllUsers } from "@/store/admin/OrderSlice";
import { fetchAllProducts } from "@/store/ProductSlice";
import { getAllQuotesofAllUsers } from "@/store/admin/QuoteRequestSlice";
import { UsersRole } from "@/store/authSlice";
import AdminCustomers from "./Customers";
import AdminOrders from "./Orders";
import AdminProducts from "./Products";

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState<string>("customers");

  // Selectors
  const { pagination } = useSelector((state: RootState) => state.adminUsers);
  const { orderList } = useSelector((state: RootState) => state.adminOrder);
  const { productList } = useSelector(
    (state: RootState) => state.adminProducts
  );
  const { quoteRequestList } = useSelector(
    (state: RootState) => state.adminQuoteRequest
  );

  useEffect(() => {
    // Fetch summary data
    dispatch(
      getAllUsers({ page: 1, limit: 5, search: "", role: UsersRole.ALL })
    );
    dispatch(getAllOrdersofAllUsers());
    dispatch(fetchAllProducts());
    dispatch(getAllQuotesofAllUsers());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | ChezFlora Admin</title>
        <meta
          name="description"
          content="Overview of users, orders, products, and quotes."
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="og:image"
          content="https://chez-flora-sigma.vercel.app/flowerGen5.jpg"
        />
      </Helmet>

      <div className="space-y-6 p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => setTab("customers")}
          >
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pagination.total}</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => setTab("orders")}
          >
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{orderList.length}</p>
              <p className="text-sm text-gray-500">Total Orders</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => setTab("products")}
          >
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{productList.length}</p>
              <p className="text-sm text-gray-500">Total Products</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => setTab("quotes")}
          >
            <CardHeader>
              <CardTitle>Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {quoteRequestList ? quoteRequestList.length : 0}
              </p>
              <p className="text-sm text-gray-500">Total Quote Requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Detail Views */}
        <Tabs value={tab} onValueChange={setTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            <AdminCustomers />
          </TabsContent>
          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>
          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>
          <TabsContent value="quotes">
            <AdminQuotes />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;
