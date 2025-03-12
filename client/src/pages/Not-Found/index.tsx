import Footer from "@/components/Common/Footer";
import ShoppingHeader from "@/components/Shopping-view/Header";
import HeaderSm from "@/components/Shopping-view/HeaderSm";

const NotFound = () => {
  return (
    <div className="flex flex-col w-full min-h-screen relative">
      {/* Main header (desktop) */}
      <ShoppingHeader />

      {/* Page content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold text-center mb-6">
          Page Not Found
        </h1>
        <img
          src="/PageNotFound.svg" 
          alt="Page not found illustration"
          className="w-64 h-auto mb-6"
        />
        {/* You can add a button or link back to home here if desired */}
      </div>

      {/* Footer */}
      <div className="z-[1] w-full">
        <Footer />
      </div>

      {/* Mobile header (hidden on large screens) */}
      <div className="lg:hidden w-full z-[2]">
        <HeaderSm />
      </div>
    </div>
  );
};

export default NotFound;
