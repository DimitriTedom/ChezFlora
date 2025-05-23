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
      <section className="w-full flex flex-col lg:flex-row lg:items-center lg:min-h-screen relative py-16 lg:py-0 sm:mt-16">
        <div className="flex flex-col gap-6 lg:w-[55%] xl:w-[50%] px-4 lg:pl-16 xl:pl-32">
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold font-Poppins leading-tight lg:leading-snug">
            Decorate your life with nature
          </h1>
          <p className="text-gray-700 text-lg lg:text-xl xl:text-2xl max-w-3xl leading-relaxed">
            Let nature inspire you to cultivate a lifestyle that is both
            beautiful and harmonious with the world around you and take time to
            appreciate the changing seasons.
          </p>
          <div className="relative max-w-fit">
            <FaSearchengin className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white w-6 h-6" />
            <Link to="/shop/search">
            <Button className="bg-pink-300 rounded-full px-8 py-4 pl-12 text-lg hover:bg-pink-400 transition-colors">
              Start your search
            </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8 lg:mt-12 max-w-2xl">
            {hereoStats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center p-4 border-l-2 border-gray-200"
              >
                <h2 className="flex items-center gap-2">
                  <span className="text-3xl lg:text-4xl xl:text-5xl font-medium">
                    {item.value}
                  </span>
                  <Plus className="w-6 h-6 text-pink-500" />
                </h2>
                <span className="text-gray-500 mt-2 text-sm lg:text-base">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
          <div className=" w-64 h-64 rounded-full bg-green-100 blur-3xl absolute -z-10 top-64 right-0"></div>
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
                  <div className="relative rounded-[2rem] overflow-hidden">
                    <img
                      src={img}
                      alt={`Flower ${index + 1}`}
                      className="object-cover w-full h-[400px] lg:h-[600px] xl:h-[700px] "
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -left-[5%] -translate-y-1/2 w-full px-4 flex justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 shadow-lg hover:shadow-xl transition-all"
              >
                <FaArrowLeft className="h-6 w-6 text-gray-800" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 shadow-lg hover:shadow-xl transition-all"
              >
                <FaArrowRight className="h-6 w-6 text-gray-800" />
              </Button>
            </div>
          </Carousel>
        </div>
      </section>
      {/* I will implememt the shop by section here */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Categories Section */}
          <div className="w-48 h-48 rounded-full bg-green-200 blur-3xl absolute z-[-1] right-[10%] lg:w-60 lg:h-60"></div>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Shop By Category
            </h2>
            <div className=" w-64 h-64 rounded-full bg-green-200 blur-3xl absolute -z-10 bottom-64 right-0"></div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filterCategory.map((category) => (
                <Card
                  className="hover:shadow-lg hover:shadow-green-300 transition-shadow duration-300 h-full"
                  key={category.id}
                  onClick={() =>
                    handleNavigateToStorePage(category.id, "category")
                  }
                >
                  <CardHeader className="flex flex-col items-center">
                    <div className="p-3 rounded-full bg-green-50 text-green-600 mb-4">
                      {category.icon}
                    </div>
                    <CardTitle className="text-lg text-center">
                      {category.label}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          <div className="w-48 h-48 rounded-full bg-pink-200 blur-3xl absolute z-[-1] left-[10%] lg:w-60 lg:h-60"></div>
          {/* Events Section */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-12">
              Shop By Occasion
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filterEvent.map((event) => (
                <Card
                  className="hover:shadow-lg hover:shadow-pink-300 transition-shadow duration-300 h-full"
                  onClick={() => handleNavigateToStorePage(event.id, "event")}
                >
                  <CardHeader className="flex flex-col items-center">
                    <div className="p-3 rounded-full bg-pink-50 text-pink-600 mb-4">
                      {event.icon}
                    </div>
                    <CardTitle className="text-lg text-center">
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
      <section className="flex flex-col items-center gap-8 mt-[4rem]  px-[3rem] py-[5rem] rounded-3xl relative overflow-hidden">
        <div>
          <FormTitle
            title="Featured Products"
            comment={`Whether you're offering an elegant bouquet, beautifying your home or celebrating a special occasion, our featured products are carefully chosen for their freshness.`}
          />
        </div>
        <img
          src="/motifFlower.png"
          alt="motifFlower"
          className="absolute z-20 scale-50 top-[-9%] right-[-50%] md:scale-75 opacity-70 rotate-180 xl:right-[-10%]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 max-w-full">
          {productList && productList.length > 0 ? (
            productList.map((product: Product) => (
              <UserProductCard
                key={product.id}
                product={product}
                handleGetProductDetails={handleGetProductDetails}
              />
            ))
          ) : (
            <h1>No items found</h1>
          )}
        </div>
        <Link to="/shop/store">
          <Button className="flex items-center justify-center rounded-full text-sm lg:text-xl px-[1rem] py-4 bg-pink-200 border border-solid border-pink-300 hover:bg-pink-300 hover:shadow-md duration-300 cursor-pointer">
            <Spinner />
            <span className="ml-4">Show me more</span>
          </Button>
        </Link>
      </section>

      {/* Testimonials */}
      <section className="flex flex-col items-center gap-8 mt-[4rem] bg-rose-100 p-[3rem] rounded-3xl relative overflow-hidden">
        <div>
          <FormTitle
            title="Testimonials"
            comment="What our customers say about us"
          />
        </div>
        <img
          src="/motifFloral-removebg-preview.png"
          alt="motifFlower"
          className="absolute scale-50 top-[-9%] right-[-50%] md:scale-75 opacity-70 rotate-180  xl:right-[-10%]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-full">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        <img
          src="/ProduitEnVedeteFlower-removebg-preview.png"
          alt="motifFlower2"
          className="absolute scale-50 bottom-[-20%] left-[-50%] md:scale-75 opacity-80  xl:left-[-20%]"
        />
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
