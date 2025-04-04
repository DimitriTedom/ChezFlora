import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";

const AdminAccount = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Helmet>
        <title>My Account - ChezFlora Admin Dashboard</title>
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
      <div className="flex flex-col">
        <div className="relative z-10 h-[400px] w-full  overflow-hidden rounded-2xl">
        <img src="/account2.jpg" alt="account" className="w-full h-full object-cover object-center rounded-2xl bg-red-300"/>
        </div>

        <div className="mx-auto mt-8 w-full">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-md w-full">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="flex justify-center space-x-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>

              </TabsList>
              <TabsContent value="profile">
                  <h1>To be implemented later, the idea is to enable user to update it's password here without having to logout, and even update it's image</h1>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccount;
