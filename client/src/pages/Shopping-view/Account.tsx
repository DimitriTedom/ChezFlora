import Address from "@/components/Shopping-view/Address";
import { AddressData } from "@/components/Shopping-view/AddressCard";
import ShoppingOrders from "@/components/Shopping-view/Orders";
import ShoppingQuotes from "@/components/Shopping-view/ShoppingQuotes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Helmet } from "react-helmet-async";

const ShoppingAccount = () => {
  const [currentSelectedAddress, setCurrentSelectedAddress] =
    React.useState<AddressData>({
      id: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      notes: "",
    });
  return (
    <div className="flex flex-col w-full min-h-screen">
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
        <meta property="og:image" content="/assets/og-account.jpg" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Dashboard UI mockup */}
      </Helmet>
      <div className="mt-32 flex flex-col">
        <div className="relative z-10 h-[400px] w-full  overflow-hidden rounded-2xl">
          <img
            src="/account2.jpg"
            alt="account"
            className="w-full h-full object-cover object-center rounded-2xl bg-red-300"
          />
        </div>

        <div className="mx-auto mt-8  w-full">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-md w-full">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="flex justify-center space-x-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <ShoppingOrders />
              </TabsContent>

              <TabsContent value="address">
                <Address
                  selectedId={currentSelectedAddress.id}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                />
              </TabsContent>

              <TabsContent value="profile">
                <h1>
                  To be implemented later, the idea is to enable user to update
                  it's password here without having to logout, and even update
                  it's image
                </h1>
              </TabsContent>

              <TabsContent value="quotes">
                <ShoppingQuotes />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
