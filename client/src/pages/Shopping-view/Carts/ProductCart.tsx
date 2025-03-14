import { BsCartPlus } from "react-icons/bs";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export interface Product {
  title: string;
  price: number;
  units: number;
  image: string;
  discount?: number;
}

const ProductCard: React.FC<Product> = ({
  title,
  price,
  units,
  image,
  discount
}) => {
  const [quantity, setQuantity] = useState(units);
  const [isLoaded, setIsLoaded] = useState(false);

  const discountedPrice = discount 
    ? price * (1 - discount / 100) 
    : price;

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`${title} added to cart`);
  };

  return (
    <motion.div
      className="bg-[#FFF7E0] rounded-xl sm:rounded-2xl shadow-lg overflow-hidden 
                 relative border-2 border-maroon max-w-full transition-shadow 
                 duration-300 hover:shadow-2xl"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Discount Badge */}
      <AnimatePresence>
        {discount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Badge className="absolute top-3 left-3 bg-red-500 text-white 
                            px-2.5 py-1 text-xs sm:text-sm font-semibold 
                            rounded-full z-10 shadow-md">
              -{discount}% TODAY
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Container */}
      <div className="aspect-square w-full relative">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-opacity 
                     duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Title and Units */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold 
                        text-gray-900 truncate flex-1">
            {title}
          </h2>
          <div className="flex items-center gap-1 text-gray-600">
            <span className="text-sm sm:text-base">{units}</span>
            <span className="hidden sm:inline">unit{units !== 1 && 's'}</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          {discount ? (
            <>
              <div className="flex items-center gap-3">
                <p className="text-gray-400 line-through text-sm sm:text-base">
                  ${price.toFixed(2)}
                </p>
                <p className="text-green-600 text-xl sm:text-2xl font-bold">
                  ${discountedPrice.toFixed(2)}
                </p>
              </div>
              <Button
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-pink-200 
                          hover:bg-pink-300 text-black font-medium 
                          shadow-md transition-all duration-200 
                          active:scale-95"
                size="sm"
              >
                <BsCartPlus className="mr-2" />
                Add to Cart
              </Button>
            </>
          ) : (
            <div className="flex justify-between w-full items-center gap-4">
              <p className="text-gray-700 text-lg sm:text-xl font-bold">
                ${price.toFixed(2)}
              </p>
              <Button
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-pink-200 
                          hover:bg-pink-300 text-black font-medium 
                          shadow-md transition-all duration-200 
                          active:scale-95"
              >
                <BsCartPlus className="mr-2" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;