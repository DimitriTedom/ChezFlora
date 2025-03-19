import { BsCartPlus } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  saleprice?: number;
}

const UserProductCard: React.FC<Product> = ({
  id,
  name,
  price,
  stock,
  image,
  saleprice
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const discountPercentage = saleprice 
    ? Math.round(((price - saleprice) / price) * 100)
    : null;
  const displayPrice = saleprice || price;

  return (
    <motion.div
      className="bg-[#F5E6D3] rounded-xl sm:rounded-2xl shadow-lg overflow-hidden 
                 relative border border-[#D4B08C] max-w-full transition-shadow 
                 duration-300 hover:shadow-2xl"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Badge de promotion */}
      <AnimatePresence>
        {discountPercentage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute top-3 left-3 z-10"
          >
            <Badge className="bg-[#8B9A46] text-white px-2.5 py-1 rounded-full">
              -{discountPercentage}% PROMO
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image */}
      <div className="aspect-square w-full relative">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-opacity 
                     duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>

      {/* Contenu */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Titre */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold 
                      text-[#8B9A46] truncate">
          {name}
        </h2>

        {/* Prix */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {discountPercentage ? (
            <div className="flex items-center gap-3">
              <p className="text-gray-400 line-through text-sm sm:text-base">
                ${price.toFixed(2)}
              </p>
              <p className="text-[#D4B08C] text-xl sm:text-2xl font-bold">
                ${displayPrice.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-[#8B9A46] text-lg sm:text-xl font-bold">
              ${price.toFixed(2)}
            </p>
          )}

          {/* Stock */}
          <div className="flex items-center gap-1 text-gray-600">
            <span className="text-sm sm:text-base">Stock: {stock}</span>
          </div>
        </div>

        {/* Bouton d'ajout au panier */}
        <Button 
          className="w-full bg-pink-200 hover:bg-pink-300 
                     text-black font-medium shadow-md transition-all 
                     duration-200 active:scale-95"
          size="sm"
          onClick={() => console.log(`Ajout de ${name} au panier`)}
        >
          <BsCartPlus className="mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default UserProductCard;