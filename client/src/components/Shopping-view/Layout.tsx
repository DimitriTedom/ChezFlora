import { Outlet } from "react-router-dom";
import ShoppingHeader from "./Header";
import HeaderSm from "./HeaderSm";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden relative">
      {/* Common header */}
      <div className="fixed z-10 top-0 bg-white/75">
        <ShoppingHeader />
      </div>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <div className="lg:hidden relative">
      <HeaderSm/>
      </div>
    </div>
  );
};

export default ShoppingLayout;
