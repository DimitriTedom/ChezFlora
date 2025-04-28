import FormTitle from "@/components/Common/FormTitle";
// import { blogsArray } from "@/data/blogs";
import { Helmet } from "react-helmet-async";
// import BlogCard from "./Carts/BlogCard";
import JoinNewsLetterComponent from "@/components/Shopping-view/contact/JoinNewsLetter";
import QuoteRequestForm from "@/components/Shopping-view/QuoteRequestForm.tsx";
import EventCarousel from "@/components/Shopping-view/ProductImageCarousel.tsx";

const ShoppingBlog = () => {
  return (
    <div className="mt-32">
      <Helmet>
        <title>ChezFlora - Request a Quote</title>
        <meta
            name="description"
            content="Request a custom quote for your floral needs. From special events to weddings, get personalized service from ChezFlora's expert florists."
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* Open Graph Tags */}
        <meta
            property="og:title"
            content="Request a Floral Quote - ChezFlora"
        />
        <meta
            property="og:description"
            content="Get a personalized quote for your floral arrangements. Perfect for weddings, events, and special occasions."
        />
        <meta property="og:image" content="/assets/og-quotes.jpg" />
      </Helmet>
      <div className="relative">

        <div className="flex flex-col items-center px-4 md:px-8 lg:px-16">
          {/*<h1 className="text-md xl:text-2xl text-gray-800">OUR BLOGS</h1>*/}
          <FormTitle
            title="Request a Quote ❤️"
            // comment="our blogs are written from very research research and well known writers writers so that  we can provide you the best blogs and articles articles for you to read them all along"
            comment="You can make quotes request for our services. We will get back to you as soon as possible."

          />
          {/*<QuoteRequestForm />*/}

          {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-full">*/}
          {/*  {blogsArray.map((blog) => (*/}
          {/*    <BlogCard*/}
          {/*      key={blog.id}*/}
          {/*      {...blog}*/}
          {/*      authorImageUrl={blog.authorImageUrl}*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*</div>*/}

          <div className="flex flex-col lg:flex-row gap-8 justify-between items-center w-full mt-4">
            <div className="lg:w-[50%] h-full">
              {/* <ProductImageCarousel {...productData} /> */}
              <EventCarousel />
            </div>
            <QuoteRequestForm />
          </div>

          <JoinNewsLetterComponent />
          <div className="w-48 h-48 rounded-full bg-pink-100 blur-3xl absolute z-[-2] left-[10%] lg:w-60 lg:h-60"></div>

          <img
            src="/motifFlower2.png"
            alt="motifFlower2"
            className="absolute scale-50 bottom-[-7%] lg:bottom-[-9%] left-[-50%] md:scale-75 opacity-80  xl:left-[-10%]"
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingBlog;
