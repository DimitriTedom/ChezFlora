import { FaSearchengin } from "react-icons/fa";
// import { BiGift } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/Shopping-view/SearchBarLg";
import FormTitle from "@/components/Common/FormTitle";
import ProductCard from "./Carts/ProductCart";
import Spinner from "@/components/Shopping-view/ShowMoreSpinner";
const ShoppingHome = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-48 h-48 rounded-full bg-pink-100 blur-3xl absolute z-[-2] left-[10%] lg:w-60 lg:h-60"></div>
      {/* Hero Section */}
      <section className="w-full h-full flex flex-col gap-8 lg:flex-row lg:justify-between xl:justify-between mt-32">
        <div className="flex flex-col gap-6 lg:max-w-[45%]">
          <h1 className="text-3xl lg:text-6xl font-bold font-Poppins lg:mt-8">
            Decorate your life with nature
          </h1>
          <p className="text-gray-700 lg:text-2xl">
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
        </div>
        <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-green-100 blur-3xl absolute z-[-2] right-0 top-[20%] lg:left-[15%]"></div>
        <div>
          <img
            src="/flowerGen5.jpg"
            alt="heroImage"
            className="rounded-[2rem] lg:h-[80%] lg:w-[100%] xl:h-[70%]"
          />
        </div>
        <div className="hidden lg:block absolute bg-gray-200 shadow-pink-300 drop-shadow-2xl w-[80%]  lg:bottom-[60%] xl:bottom-[78%]">
          <div>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="flex flex-col items-center gap-8 mt-[4rem] bg-green-200 p-[3rem] rounded-3xl relative overflow-x-hidden">
        <div>
          <FormTitle
            title="Featured Products"
            comment={`Whether you're offering an elegant bouquet, beautifying your home or celebrating a special occasion, our featured products are carefully chosen for their freshness.`}
          />
        </div>
        <img
          src="/motifFlower.png"
          alt="motifFlower"
          className="absolute scale-50 top-[-9%] right-[-50%] md:scale-75 opacity-70 rotate-180"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-full">
          <ProductCard
            title="Lavender the flower of summer "
            price={10.99}
            units={10}
            image="/flowerGen4(Services).jpg"
            discount={20}
          />
          <ProductCard
            title="Lavender"
            price={143.99}
            units={20}
            image="/flowerGen4(Services).jpg"
            discount={40}
          />
          <ProductCard
            title="Lavender"
            price={10.99}
            units={10}
            image="/flowerGen4(Services).jpg"
          />
        </div>
        <Button className="flex items-center justify-center rounded-full text-sm lg:text-xl px-[1rem] py-4 bg-orange-300 border border-solid border-orange-500 hover:bg-oramge-500 hover:shadow-md duration-300 cursor-pointer">
          <Spinner />
          <span className="ml-4">Show me more</span>
        </Button>{" "}

        <img
          src="/motifFlower2.png"
          alt="motifFlower2"
          className="absolute scale-50 bottom-[-9%] left-[-50%] md:scale-75 opacity-80"
        />
      </section>
    </div>
  );
};

export default ShoppingHome;
