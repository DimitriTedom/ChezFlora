import AboutHeroSection from "@/components/Shopping-view/About/AboutSection";
import { Helmet } from "react-helmet-async";
import FounderCard from "./Carts/FounderCard";
import { Founders } from "@/data/About.FounderUsers";
import FastFacts from "@/components/Shopping-view/About/FastFacts";
import FormTitle from "@/components/Common/FormTitle";
import GoodNewsCarousel from "@/components/Shopping-view/About/GoodNewsCarousel";

const ShoppingAbout = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>ChezFlora - About Us | Artisanal Floral Design Since 2016</title>
        <meta
          name="description"
          content="Discover ChezFlora's story: eco-responsible floral design, partnerships with local growers, and bespoke event decoration. Committed to sustainability since 2016."
        />
        <meta
          name="keywords"
          content="artisanal flowers, sustainable decoration, event florist, eco-friendly bouquets, local partnerships"
        />
        {/* Open Graph (Social Media) Tags */}
        <meta property="og:title" content="ChezFlora - Our Story & Values" />
        <meta
          property="og:description"
          content="Learn about our 7-year journey crafting premium floral arrangements with ethical practices. Proudly partnering with local producers for fresh, seasonal blooms."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/shop/about"
        />
        <meta property="og:image" content="/assets/og-about.jpg" />{" "}
        {/* Replace with team/workshop image */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ChezFlora - Artisanal Floristry with Purpose"
        />
        <meta
          name="twitter:description"
          content="Founded in 2016, we blend artistry and sustainability to create unforgettable floral experiences for events and homes."
        />
        <meta name="twitter:image" content="/assets/og-about.jpg" />{" "}
      </Helmet>

      {/* Hero Section */}
      <div className="mt-16">
        <AboutHeroSection />
      </div>

      {/* Founder Introduction Section */}
      <div className=" flex flex-col items-center px-4 md:px-8 lg:px-16">
        <div className=" space-y-4 mb-12 self-start">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-Poppins">
            👋️ Our Founders
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Meet the team creating sustainable floral experiences with passion
            and purpose
          </p>
        </div>

        {/* Founder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Founders.map((founder, index) => (
            <FounderCard key={index} {...founder} />
          ))}
        </div>
      </div>
{/* Fast Facts */}
      <section className="pt-32">
          <FastFacts/>
      </section>
      {/* Good news from Far away */}

      <section className="mt-16 px-4 md:px-8 lg:px-16 py-12 bg-rose-200 rounded-xl relative">
            <FormTitle title="🗞️ Good news from far away" comment="Let's see what people think of ChezFlora" />
            <div>
                {/* <img src="/GroupOfAvatars.png" alt="group of avatars" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> */}
            <GoodNewsCarousel/>
            </div>
      </section>
    </div>
  );
};

export default ShoppingAbout;
