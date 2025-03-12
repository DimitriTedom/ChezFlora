import { Outlet } from "react-router-dom";
import ShoppingHeader from "../Shopping-view/Header";
import HeaderSm from "../Shopping-view/HeaderSm";
import Footer from "../Common/Footer";

const ShoppingLayout = () => {
  return (
    <div className="flex justify-center items-center flex-col relative w-full">
      {/* Header Component */}
      <ShoppingHeader />
      <div className="lg:px-[30rem] lg:pb-[8rem] pt-5 p-8 xl:px-[20rem]">
        <Outlet />
      </div>
      {/* footer component */}
      <div className="z-[1] w-full">
        <Footer />
      </div>
      <div className="lg:hidden w-full z-[2]">
        <HeaderSm />
      </div>
    </div>
  );
};

export default ShoppingLayout;
