import { Outlet } from "react-router-dom";
import ShoppingHeader from "../Shopping-view/Header";
import HeaderSm from "../Shopping-view/HeaderSm";
import Footer from "../Common/Footer";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen m-0 relative overflow-x-hidden">
      {/* Header Component */}
      <div className="mb-32 bg-opacity-95 absolute top-0 z-[50] overflow-x-hidden">
        <ShoppingHeader />
      </div>
      <div className="lg:px-[20rem] lg:pb-[8rem] p-8 xl:px-[6rem] w-full h-full md:px-[4rem] overflow-x-hidden">
        <Outlet />
      </div>
      {/* footer component */}
      <div className="z-[1] w-full overflow-x-hidden">
        <Footer />
      </div>
      <div className="lg:hidden w-screen z-[2] overflow-x-hidden">
        <HeaderSm />
      </div>
    </div>
  );
};

export default ShoppingLayout;
