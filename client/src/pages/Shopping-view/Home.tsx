import { TbChristmasTree } from "react-icons/tb";
import { GiBigDiamondRing } from "react-icons/gi";
import { GiVineFlower } from "react-icons/gi";
import { FaSearchengin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import FormTitle from "@/components/Common/FormTitle";
import  { Product } from "./Carts/ProductCart";
import Spinner from "@/components/Shopping-view/ShowMoreSpinner";
import TestimonialCard, { Testimonial } from "./Carts/TestimonialCard";
// import BlogCard from "./Carts/BlogCard";
// import { blogsArray } from "@/data/blogs";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import UserProductCard from "./Carts/ProductCart";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchAllFilteredProducts,
} from "@/store/shop/ShopProductSlice";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Flower, Sprout, Home, Cake, Cross, Heart, Gift } from "lucide-react";
const images = [
  "/flowerGen5.jpg",
  "/account2.jpg",
  "/blog4.jpeg",
  "/AdminAvatar.jpeg",
];
const filterCategory = [
  {
    id: "FRESH_FLOWERS",
    label: "Fresh Flowers",
    icon: <Flower className="w-6 h-6" />,
  },
  {
    id: "BOUQUETS",
    label: "Bouquets",
    icon: <GiVineFlower className="w-6 h-6" />,
  },
  {
    id: "POTTED_PLANTS",
    label: "Potted Plants",
    icon: <Sprout className="w-6 h-6" />,
  },
  { id: "DECORATION", label: "Decoration", icon: <Home className="w-6 h-6" /> },
];

const filterEvent = [
  {
    id: "WEDDING",
    label: "Wedding",
    icon: <GiBigDiamondRing className="w-6 h-6" />,
  },
  { id: "BIRTHDAY", label: "BirthDay", icon: <Cake className="w-6 h-6" /> },
  { id: "FUNERAL", label: "Funeral", icon: <Cross className="w-6 h-6" /> },
  {
    id: "CHRISTMASS",
    label: "Christmass",
    icon: <TbChristmasTree className="w-6 h-6" />,
  },
  {
    id: "VALENTINES",
    label: "Valentine's Day",
    icon: <Heart className="w-6 h-6" />,
  },
  { id: "WOMENDAY", label: "Women's Day", icon: <Gift className="w-6 h-6" /> },
];

const testimonials: Testimonial[] = [
  {
    text: "I ordered a bouquet of roses for my mother's birthday, and she was amazed! The flowers were fresh, perfectly arranged, and delivered in exquisite packaging. ChezFlora truly knows how to make every occasion look elegant.",
    name: "Marie Dubois",
    imageUrl: "/avatar1.png",
    tagline: "Client since 2020",
    rating: 4.6,
  },
  {
    text: "The customer service is exceptional! I had to change my order at the last minute and the team was extremely accommodating. The orchids I received were incredibly beautiful.",
    name: "Lucas Martin",
    imageUrl: "/avatar2.svg",
    tagline: "Loyal customer",
    rating: 4.2,
  },
  {
    text: "I was skeptical about international shipping, but ChezFlora exceeded my expectations. The lilies I sent to my sister in Canada arrived in perfect condition after just 48 hours.",
    name: "Sophie Moreau",
    imageUrl: "/avatar3.svg",
    tagline: "Client since 2022",
    rating: 5.0,
  },
  {
    text: "The shipping cost was a little high, but the quality of the flowers more than makes up for it. The tulips I received were fresh and lasted over a week. I definitely recommend them!",
    name: "Élodie Durand",
    imageUrl: "/avatar4.svg",
    tagline: "Client since 2023",
    rating: 3.5,
  },
];
const hereoStats = [
  {
    title: "Flowers available",
    value: "300",
  },
  {
    title: "Customers",
    value: "1000",
  },
  {
    title: "Deliveries",
    value: "700",
  },
];

const ShoppingHome = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [autoRotation, setAutoRotation] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { productList } = useSelector((state: RootState) => state.shopProducts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api || !autoRotation) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [api, autoRotation]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
    setAutoRotation(false);
    setTimeout(() => setAutoRotation(true), 10000);
  }, [api]);

  const handlePrev = useCallback(() => {
    api?.scrollPrev();
    setAutoRotation(false);
    setTimeout(() => setAutoRotation(true), 10000);
  }, [api]);
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);
  const handleGetProductDetails = (productId: string) => {
    navigate(`/shop/detail/${productId}`);
  };

  const handleNavigateToStorePage = (
    getCurrentItem: string,
    section: string
  ) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/store`);
  };
  return (
    <div className="w-full overflow-x-hidden">
      <Helmet>
        <title>ChezFlora - Fresh Flowers, Décoration, and Event Services</title>
        <meta
          name="description"
          content="Discover fresh floral arrangements, plants, and bespoke decoration services for events. Order online with fast delivery. Eco-friendly and artisanal quality since 2016."
        />
        <meta
          property="og:title"
          content="ChezFlora - Floral Décoration Experts"
        />
        <meta
          property="og:description"
          content="Explore premium flowers, event decoration, and personalized floral services. Shop online for weddings, events, and home décor."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/og-home.jpg" />
        <meta property="og:url" content="https://www.chezflora.com/shop/home" />
      </Helmet>

      <div className="w-48 h-48 rounded-full bg-pink-100 blur-3xl absolute z-[-2] left-[10%] lg:w-60 lg:h-60"></div>
      {/* Hero Section */}
      <section className="w-full flex flex-col lg:flex-row lg:items-center lg:min-h-screen relative py-16 lg:py-0 sm:mt-16 overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 float animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-green-200 rounded-full opacity-20 float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 float" style={{animationDelay: '2s'}}></div>
        
        <div className="flex flex-col gap-8 lg:w-[55%] xl:w-[50%] px-4 lg:pl-16 xl:pl-32 z-10">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold font-playfair leading-tight lg:leading-snug gradient-text">
              Decorate your life with nature
            </h1>
            <p className="text-gray-700 text-lg lg:text-xl xl:text-2xl max-w-3xl leading-relaxed opacity-90">
              Let nature inspire you to cultivate a lifestyle that is both
              beautiful and harmonious with the world around you and take time to
              appreciate the changing seasons.
            </p>
          </div>
          
          <div className="relative max-w-fit group">
            <FaSearchengin className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white w-6 h-6 z-10" />
            <Link to="/shop/search">
              <Button className="btn-flower pl-14 py-6 text-lg font-semibold group-hover:scale-105 transition-all duration-300">
                Start your search
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mt-12 lg:mt-16 max-w-2xl">
            {hereoStats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center p-6 border-l-4 border-gradient-to-b from-pink-400 to-rose-500 bg-white bg-opacity-50 backdrop-blur-sm rounded-r-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h2 className="flex items-center gap-2">
                  <span className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800">
                    {item.value}
                  </span>
                  <Plus className="w-6 h-6 text-pink-500" />
                </h2>
                <span className="text-gray-600 mt-2 text-sm lg:text-base font-medium">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:absolute right-0 top-1/2 lg:-translate-y-1/2 w-full lg:w-[45%] xl:w-[40%] mt-12 lg:mt-0 px-4 lg:px-0">
          <Carousel
            setApi={setApi}
            className="lg:max-w-2xl xl:max-w-3xl lg:pr-16"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl flower-shadow">
                    <img
                      src={img}
                      alt={`Beautiful flower arrangement ${index + 1}`}
                      className="object-cover w-full h-[400px] lg:h-[600px] xl:h-[700px] transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Enhanced Navigation Arrows */}
            <div className="absolute top-1/2 -left-[5%] -translate-y-1/2 w-full px-4 flex justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="h-14 w-14 rounded-full glass-effect hover:bg-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <FaArrowLeft className="h-6 w-6 text-gray-700" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="h-14 w-14 rounded-full glass-effect hover:bg-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <FaArrowRight className="h-6 w-6 text-gray-700" />
              </Button>
            </div>
          </Carousel>
        </div>
      </section>
      {/* Shop by Category and Events */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 flower-gradient relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-green-200 rounded-full opacity-20 blur-3xl" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto">
          {/* Categories Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-800 mb-4">
                Shop By Category
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our beautiful collection organized by type
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filterCategory.map((category) => (
                <Card
                  className="group hover:shadow-2xl hover:shadow-green-300/50 transition-all duration-500 h-full cursor-pointer border-green-200 bg-white/80 backdrop-blur-sm card-hover"
                  key={category.id}
                  onClick={() =>
                    handleNavigateToStorePage(category.id, "category")
                  }
                >
                  <CardHeader className="flex flex-col items-center p-8">
                    <div className="p-4 rounded-full bg-gradient-to-br from-green-100 to-green-200 text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg text-center font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                      {category.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Events Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold font-playfair text-gray-800 mb-4">
                Shop By Occasion
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Perfect flowers for every special moment
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filterEvent.map((event) => (
                <Card
                  key={event.id}
                  className="group hover:shadow-2xl hover:shadow-pink-300/50 transition-all duration-500 h-full cursor-pointer border-pink-200 bg-white/80 backdrop-blur-sm card-hover"
                  onClick={() => handleNavigateToStorePage(event.id, "event")}
                >
                  <CardHeader className="flex flex-col items-center p-6">
                    <div className="p-3 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 text-pink-600 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {event.icon}
                    </div>
                    <CardTitle className="text-sm text-center font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                      {event.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products */}
      <section className="flex flex-col items-center gap-12 mt-20 px-8 py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-100 to-transparent rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-100 to-transparent rounded-full opacity-50"></div>
        
        <div className="text-center max-w-4xl">
          <FormTitle
            title="Featured Products"
            comment="Whether you're offering an elegant bouquet, beautifying your home or celebrating a special occasion, our featured products are carefully chosen for their freshness, beauty, and lasting quality."
          />
        </div>
        
        {/* Decorative flower motif */}
        <img
          src="/motifFlower.png"
          alt="Decorative flower motif"
          className="absolute z-10 scale-50 top-[-5%] right-[-30%] md:scale-75 opacity-30 rotate-180 xl:right-[-5%] pointer-events-none"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8 mt-12 max-w-full w-full">
          {productList && productList.length > 0 ? (
            productList.slice(0, 10).map((product: Product, index: number) => (
              <UserProductCard
                key={product.id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <img 
                src="/NoProducts.svg" 
                alt="No products found" 
                className="w-32 h-32 md:w-48 md:h-48 opacity-50 mb-6"
              />
              <h1 className="text-xl md:text-2xl text-gray-500 font-medium mb-2">No items found</h1>
              <p className="text-gray-400">Please check back later for new products</p>
            </div>
          )}
        </div>
        
        <Link to="/shop/store" className="mt-8">
          <Button className="group btn-flower px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-xl">
            <Spinner />
            <span className="ml-3">Explore All Products</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </Link>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="flex flex-col items-center gap-8 sm:gap-12 lg:gap-16 mt-16 sm:mt-20 flower-gradient p-6 sm:p-12 lg:p-20 xl:p-24 relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-20 sm:opacity-30 blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-tl from-purple-200 to-pink-200 rounded-full opacity-20 sm:opacity-30 blur-3xl animate-float-reverse"></div>
        
        {/* Header section with improved spacing */}
        <div className="text-center max-w-2xl sm:max-w-4xl z-10 px-4">
          <FormTitle
            title="What Our Customers Say"
            comment="Discover why thousands of customers trust ChezFlora for their floral needs. Read their beautiful stories and experiences that make every occasion special."
          />
        </div>
        
        {/* Enhanced decorative flower motifs with better responsive positioning */}
        <img
          src="/motifFloral-removebg-preview.png"
          alt="Decorative floral motif"
          className="absolute scale-25 sm:scale-50 lg:scale-75 top-[-5%] right-[-40%] sm:right-[-30%] lg:right-[-15%] xl:right-[-5%] opacity-30 sm:opacity-40 rotate-180 pointer-events-none"
        />
        <img
          src="/ProduitEnVedeteFlower-removebg-preview.png"
          alt="Decorative flower motif"
          className="absolute scale-25 sm:scale-50 lg:scale-75 bottom-[-10%] left-[-40%] sm:left-[-30%] lg:left-[-15%] xl:left-[-10%] opacity-30 sm:opacity-40 pointer-events-none"
        />
        
        {/* Enhanced responsive grid with improved spacing */}
        <div className="w-full max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="group h-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Enhanced footer section with better responsive design */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center z-10 px-4">
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 font-medium">Join thousands of happy customers</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">4.8/5</span>
              <span className="text-sm sm:text-base lg:text-lg text-gray-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-pink-200">
                from 1000+ reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      {/*<section className="flex flex-col items-center gap-8 mt-[4rem] bg-gray-100 p-[3rem] rounded-3xl relative overflow-hidden">*/}
      {/*  <div>*/}
      {/*    <FormTitle*/}
      {/*      title="Find our all blogs from here"*/}
      {/*      comment="our blogs are written from very research research and well known writers writers so that  we can provide you the best blogs and articles articles for you to read them all along"*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <img*/}
      {/*    src="/motifFlower.png"*/}
      {/*    alt="motifFlower"*/}
      {/*    className="absolute scale-50 top-[-9%] right-[-50%] md:scale-75 opacity-70 rotate-180 xl:right-[-10%]"*/}
      {/*  />*/}
      {/*  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-full">*/}
      {/*    {blogsArray.map((blog) => (*/}
      {/*      <BlogCard*/}
      {/*        key={blog.id}*/}
      {/*        {...blog}*/}
      {/*        authorImageUrl={blog.authorImageUrl} // Optional prop*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </div>*/}

      {/*  <Link to="/shop/blog">*/}
      {/*    <Button className="flex items-center justify-center rounded-full text-sm lg:text-xl px-[1rem] py-4 bg-rose-300 border border-solid border-orange-500 hover:bg-oramge-500 hover:shadow-md duration-300 cursor-pointer">*/}
      {/*      <Spinner />*/}
      {/*      <span className="ml-4">Show me more</span>*/}
      {/*    </Button>{" "}*/}
      {/*  </Link>*/}
      {/*</section>*/}
    </div>
  );
};

export default ShoppingHome;
