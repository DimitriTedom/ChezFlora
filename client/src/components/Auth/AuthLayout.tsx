import { Outlet } from "react-router-dom";
import ShoppingHeader from "../Shopping-view/Header";
import HeaderSm from "../Shopping-view/HeaderSm";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center flex-col relative w-full">
      {/* Header Component */}
      <ShoppingHeader />
      <div className="py-8 lg:py-16 w-full bg-pink-200 absolute top-[7.5%] z-[-1]"></div>
      <div className="lg:px-[30rem] lg:pb-[8rem] pt-16 p-8 xl:px-[20rem]">
        <Outlet />
      </div>
      {/* footer component */}
      <footer>hello</footer>
      <div className="lg:hidden w-full">
        <HeaderSm />
      </div>
    </div>
  );
};

export default AuthLayout;
