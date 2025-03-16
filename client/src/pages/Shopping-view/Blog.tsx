import FormTitle from "@/components/Common/FormTitle";
import { blogsArray } from "@/data/blogs";
import { Helmet } from "react-helmet-async";
import BlogCard from "./Carts/BlogCard";
import JoinNewsLetterComponent from "@/components/Shopping-view/contact/JoinNewsLetter";

const ShoppingBlog = () => {
  return (
    <div className="mt-32">
      <Helmet>
        <title>ChezFlora Blog - Floral Tips & Trends</title>
        <meta
          name="description"
          content="Read expert guides on flower care, event decoration ideas, and eco-friendly gardening tips. Stay inspired for your next project."
        />
        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Floral Inspiration - ChezFlora Blog"
        />
        <meta
          property="og:description"
          content="Learn how to care for your plants, design weddings, and follow the latest floral trends."
        />
        <meta property="og:image" content="/assets/og-blog.jpg" />{" "}
        {/* Blog post cover image */}
      </Helmet>
      <div className="relative">
      <img
          src="/motifFlower.png"
          alt="motifFlower"
          className="absolute scale-50 top-[-9%] right-[-50%] md:scale-75 opacity-70 rotate-180 xl:right-[-20%]"
        />
        <div className="flex flex-col items-center px-4 md:px-8 lg:px-16">
          <h1 className="text-md xl:text-2xl text-gray-800">OUR BLOGS</h1>
          <FormTitle
            title="Find our all blogs from here"
            comment="our blogs are written from very research research and well known writers writers so that  we can provide you the best blogs and articles articles for you to read them all along"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-full">
            {blogsArray.map((blog) => (
              <BlogCard
                key={blog.id}
                {...blog}
                authorImageUrl={blog.authorImageUrl}
              />
            ))}
          </div>

          <JoinNewsLetterComponent/>
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
