import Footer from "@/components/Common/Footer";
import ShoppingHeader from "@/components/Shopping-view/Header";
import HeaderSm from "@/components/Shopping-view/HeaderSm";
import { Helmet } from "react-helmet-async";

const UnAuthPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen relative">
      <Helmet>
        <title>Access Restricted | ChezFlora</title>
        <meta
          name="description"
          content="You need to log in to access this page. Sign in to manage your account or shop floral arrangements."
        />
        <meta property="og:title" content="Access Restricted | ChezFlora" />
        <meta
          property="og:description"
          content="Sign in to your ChezFlora account to continue."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/unauth-page"
        />
        <meta
          property="og:image"
          content="https://www.chezflora.com/images/auth-required-preview.jpg"
        />
      </Helmet>

      <ShoppingHeader />


      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold text-center mb-6">Acces Denied</h1>
        <img
          src="/accesDenied-removebg-preview.png"
          alt="Page not found illustration"
          className="w-64 h-auto mb-6"
        />

      </div>


      <div className="z-[1] w-full">
        <Footer />
      </div>


      <div className="lg:hidden w-full z-[2]">
        <HeaderSm />
      </div>
    </div>
  );
};

export default UnAuthPage;
