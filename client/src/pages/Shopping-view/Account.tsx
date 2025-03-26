import Address from "@/components/Shopping-view/Address";
import Orders from "@/components/Shopping-view/Orders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";

const ShoppingAccount = () => {
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
        <meta property="og:image" content="/assets/og-account.jpg" />{" "}
        {/* Dashboard UI mockup */}
      </Helmet>
      <div className="mt-32 flex flex-col">
        <div className="relative z-10 h-[300px] w-full overflow-hidden">
        <img src="/account.jpg" alt="account" className="w-full h-full object-cover object-center"/>
        </div>

        <div className="mx-auto mt-8 bg-red-500 w-full">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-md w-full bg-green-200">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <Orders/>
              </TabsContent>

              <TabsContent value="address">
                <Address/>
                </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;
