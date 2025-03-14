import { FaSearchengin } from "react-icons/fa";
// import { BiGift } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/Shopping-view/SearchBarLg";
import FormTitle from "@/components/Common/FormTitle";
import ProductCard from "./Carts/ProductCart";
import Spinner from "@/components/Shopping-view/ShowMoreSpinner";
import TestimonialCard, { Testimonial } from "./Carts/TestimonialCard";
import BlogCard from "./Carts/BlogCard";
import { blogsArray } from "@/data/blogs";
import { products } from "@/data/Products";
import { Link } from "react-router-dom";
const ShoppingHome = () => {
  const testimonials: Testimonial[] = [
    {
      text: "J'ai commandé un bouquet de roses pour l'anniversaire de ma mère, et elle a été émerveillée ! Les fleurs étaient fraîches, parfaitement arrangées et livrées dans un emballage raffiné. ChezFlora sait vraiment comment sublimer chaque occasion avec élégance.",
      name: "Marie Dubois",
      imageUrl: "/avatar1.png",
      tagline: "Cliente depuis 2020",
      rating: 4.6,
    },
    {
      text: "Le service client est exceptionnel ! J'ai dû modifier ma commande à la dernière minute et l'équipe a été extrêmement accommodante. Les orchidées que j'ai reçues étaient incroyablement belles.",
      name: "Lucas Martin",
      imageUrl: "/avatar2.svg",
      tagline: "Client fidèle",
      rating: 4.2,
    },
    {
      text: "J'étais sceptique sur la livraison internationale, mais ChezFlora a dépassé mes attentes. Les lys que j'ai envoyés à ma sœur au Canada sont arrivés en parfait état après seulement 48 heures.",
      name: "Sophie Moreau",
      imageUrl: "/avatar3.svg",
      tagline: "Client depuis 2022",
      rating: 5.0,
    },
    {
      text: "Les frais de livraison étaient un peu élevés, mais la qualité des fleurs compense largement. Les tulipes que j'ai reçues étaient fraîches et ont duré plus d'une semaine. Je recommande sans hésiter !",
      name: "Élodie Durand",
      imageUrl: "/avatar4.svg",
      tagline: "Client depuis 2023",
      rating: 3.5,
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-48 h-48 rounded-full bg-pink-100 blur-3xl absolute z-[-2] left-[10%] lg:w-60 lg:h-60"></div>
      {/* Hero Section */}
      <section className="w-full h-full flex flex-col gap-8 relative lg:flex-row lg:justify-between xl:justify-between mt-32">
        <div className="flex flex-col gap-6 lg:max-w-[45%]">
          <h1 className="text-3xl lg:text-6xl font-bold font-Poppins lg:mt-8">
            Decorate your life with nature
          </h1>
          <p className="text-gray-700 lg:text-2xl xl:text-xl">
            Let nature inspire you to cultivate a lifestyle that is both
            beautiful and harmonious with the world around you and take time to
            appreciate the changing seasons.
          </p>
          <div className="relative">
            <FaSearchengin className="absolute top-3 left-4 text-white" />
            <Button className="bg-pink-300 rounded-full px-6 py-3 pl-10 hover:bg-pink-400 cursor-pointer">
              Start your search
            </Button>
          </div>
          <div className="hidden lg:block absolute bg-gray-200 shadow-pink-300 drop-shadow-2xl w-[80%] xl:w-[90%] lg:bottom-[60%] xl:top-[65%]">
            <div>
              <SearchBar />
            </div>
          </div>
        </div>
        <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-green-100 blur-3xl absolute z-[-2] right-0 top-[20%] lg:left-[15%]"></div>
        <div>
          <img
            src="/flowerGen5.jpg"
            alt="heroImage"
            className="rounded-[2rem] lg:h-[80%] lg:w-[100%] xl:h-[85%]"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="flex flex-col items-center gap-8 mt-[4rem] bg-green-200 px-[3rem] py-[5rem] rounded-3xl relative overflow-hidden">
        <div>
          <FormTitle
            title="Featured Products"
            comment={`Whether you're offering an elegant bouquet, beautifying your home or celebrating a special occasion, our featured products are carefully chosen for their freshness.`}
          />
        </div>
        <img
          src="/motifFlower.png"
          alt="motifFlower"
          className="absolute scale-50 top-[-9%] right-[-50%] md:scale-75 opacity-70 rotate-180 xl:right-[-10%]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-full">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        <Link to="/shop/store">
        
        <Button className="flex items-center justify-center rounded-full text-sm lg:text-xl px-[1rem] py-4 bg-orange-300 border border-solid border-orange-500 hover:bg-oramge-500 hover:shadow-md duration-300 cursor-pointer">
          <Spinner />
          <span className="ml-4">Show me more</span>
        </Button>{" "}
        </Link>
        <img
          src="/motifFlower2.png"
          alt="motifFlower2"
          className="absolute scale-50 bottom-[-9%] left-[-50%] md:scale-75 opacity-80  xl:left-[-10%]"
        />
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
      <section className="flex flex-col items-center gap-8 mt-[4rem] bg-gray-100 p-[3rem] rounded-3xl relative overflow-hidden">
        <div>
          <FormTitle
            title="Find our all blogs from here"
            comment="our blogs are written from very research research and well known writers writers so that  we can provide you the best blogs and articles articles for you to read them all along"
          />
        </div>
        <img
          src="/motifFlower.png"
          alt="motifFlower"
          className="absolute scale-50 top-[-9%] right-[-50%] md:scale-75 opacity-70 rotate-180 xl:right-[-10%]"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-full">
          {blogsArray.map((blog) => (
            <BlogCard
              key={blog.id}
              {...blog}
              authorImageUrl={blog.authorImageUrl} // Optional prop
            />
          ))}
        </div>
        {/* <img
          src="/motifFlower2.png"
          alt="motifFlower2"
          className="absolute scale-50 bottom-[-9%] left-[-50%] md:scale-75 opacity-80  xl:left-[-10%]"
        /> */}
        <Link to="/shop/blog">
        
        <Button className="flex items-center justify-center rounded-full text-sm lg:text-xl px-[1rem] py-4 bg-rose-300 border border-solid border-orange-500 hover:bg-oramge-500 hover:shadow-md duration-300 cursor-pointer">
          <Spinner />
          <span className="ml-4">Show me more</span>
        </Button>{" "}
        </Link>
      </section>
    </div>
  );
};

export default ShoppingHome;
