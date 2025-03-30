import { Outlet } from "react-router-dom";
// import ShoppingHeader from "../Shopping-view/Header";
// import HeaderSm from "../Shopping-view/HeaderSm";
// import Footer from "../Common/Footer";

const AuthLayout = () => {
  return (
    <div className="flex justify-center items-center flex-col relative w-full">
      {/* Header Component */}
      {/* <ShoppingHeader /> */}
      <div className="py-8 lg:py-16 w-full bg-pink-200 absolute top-[12%] lg:top-[7.5%] z-[-1]"></div>
      <div className="lg:px-[30rem] lg:pb-[8rem] pt-5 p-8 xl:px-[20rem] min-h-screen">
        <Outlet />
      </div>
      {/* footer component */}
      {/* <div className="z-[1] w-full">
        <Footer />
      </div> */}
      {/* <div className="lg:hidden w-full z-[2]">
        <HeaderSm />
      </div> */}
    </div>
  );
};

export default AuthLayout;
