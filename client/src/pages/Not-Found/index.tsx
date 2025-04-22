import Footer from "@/components/Common/Footer";
import ShoppingHeader from "@/components/Shopping-view/Header";
import HeaderSm from "@/components/Shopping-view/HeaderSm";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="flex flex-col w-full min-h-screen relative">
      <Helmet>
        <title>Page Not Found | ChezFlora</title>
        <meta
          name="description"
          content="This page doesn't exist. Explore ChezFlora's floral collections or return to the homepage."
        />
        <meta property="og:title" content="Page Not Found | ChezFlora" />
        <meta
          property="og:description"
          content="Oops! The page you’re looking for isn’t here. Browse our flowers instead."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.chezflora.com/404" />
        <meta
          property="og:image"
          content="https://www.chezflora.com/images/404-preview.jpg"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Helmet>

      <ShoppingHeader />

      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold text-center mb-6">Page Not Found</h1>
        <img
          src="/PageNotFound.svg"
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

export default NotFound;
