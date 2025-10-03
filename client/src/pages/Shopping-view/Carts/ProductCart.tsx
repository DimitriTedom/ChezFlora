import { BsCartPlus } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  saleprice?: number;
}

interface UserProductCardProps {
  product: Product;
  handleGetProductDetails: (id: string) => void;
}

const UserProductCard: React.FC<UserProductCardProps> = ({
  product,
  handleGetProductDetails
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const discountPercentage = product.saleprice
    ? Math.round(((product.price - product.saleprice) / product.price) * 100)
    : null;
  const displayPrice = product.saleprice || product.price;

  return (
    <Card
      onClick={() => handleGetProductDetails(product.id)}
      className="w-full h-full cursor-pointer"
    >
      <motion.div
        className="bg-[#F5E6D3] rounded-xl sm:rounded-2xl shadow-lg overflow-hidden relative border border-[#D4B08C] h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        {/* Promotion Badge */}
        <AnimatePresence>
          {discountPercentage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="absolute top-2 left-2 md:top-3 md:left-3 z-10"
            >
              <Badge className="bg-red-500 text-white px-2 py-1 md:px-2.5 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                -{discountPercentage}% OFF
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Container */}
        <div className="relative w-full aspect-square flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-3 md:space-y-4 flex flex-col flex-grow">
          {/* Title */}
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-poppins font-bold line-clamp-2 leading-tight">
            {product.name}
          </h2>

          {/* Price and Stock Container */}
          <div className="flex flex-col space-y-2 md:space-y-3 flex-grow">
            {/* Price */}
            <div className="flex items-center justify-between">
              {discountPercentage ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <p className="text-gray-400 line-through text-xs sm:text-sm">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-green-600 text-lg sm:text-xl md:text-2xl font-bold">
                    ${displayPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-gray-700 text-base sm:text-lg md:text-xl font-bold">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-1">
              <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                product.stock > 10 
                  ? 'bg-green-100 text-green-700' 
                  : product.stock > 0 
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto pt-2">
            {product.stock === 0 ? (
              <Button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium shadow-md transition-all duration-200 cursor-not-allowed text-xs sm:text-sm md:text-base py-2 md:py-3"
                size="sm"
                disabled
              >
                <BsCartPlus className="mr-1 md:mr-2 w-3 h-3 md:w-4 md:h-4" />
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-pink-200 hover:bg-pink-300 text-black font-medium shadow-md transition-all duration-200 active:scale-95 hover:shadow-lg text-xs sm:text-sm md:text-base py-2 md:py-3"
                size="sm"
              >
                <BsCartPlus className="mr-1 md:mr-2 w-3 h-3 md:w-4 md:h-4" />
                View Details
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default UserProductCard;
