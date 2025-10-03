import { BsCartPlus } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import LazyImage from "@/components/Common/LazyImage";
import { useLazyLoading } from "@/hooks/useIntersectionObserver";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  saleprice?: number;
  category?: string;
  averageReview?: number;
}

interface UserProductCardProps {
  product: Product;
  handleGetProductDetails: (id: string) => void;
  index?: number;
}

const UserProductCard: React.FC<UserProductCardProps> = ({
  product,
  handleGetProductDetails,
  index = 0
}) => {
  const { targetRef, isIntersecting } = useLazyLoading({
    threshold: 0.1,
    rootMargin: "50px"
  });

  const discountPercentage = product.saleprice
    ? Math.round(((product.price - product.saleprice) / product.price) * 100)
    : null;
  const displayPrice = product.saleprice || product.price;

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(255, 182, 193, 0.4)",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  // Loading skeleton when not in view
  if (!isIntersecting) {
    return (
      <div ref={targetRef} className="w-full h-full">
        <Card className="h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-pink-100">
          <div className="aspect-square w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-3/4" />
            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-1/2" />
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-20" />
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-24" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      ref={targetRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group w-full h-full"
    >
      <Card
        onClick={() => handleGetProductDetails(product.id)}
        className="w-full h-full cursor-pointer overflow-hidden"
      >
        <motion.div
          variants={cardVariants}
          className="flower-gradient rounded-2xl shadow-lg overflow-hidden relative border border-pink-200 h-full flex flex-col transition-all duration-300"
        >
          {/* Promotion Badge */}
          <AnimatePresence>
            {discountPercentage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: -15 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute top-3 left-3 z-10"
              >
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg pulse-glow">
                  -{discountPercentage}% OFF
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wishlist Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 z-10 bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              // Add wishlist functionality here
            }}
          >
            <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>

          {/* Image Container */}
          <div className="relative w-full aspect-square flex-shrink-0 overflow-hidden">
            <motion.div
              variants={imageVariants}
              className="w-full h-full"
            >
              <LazyImage
                src={product.image}
                alt={product.name}
                className="w-full h-full"
                fallbackSrc="/placeholder-flower.png"
              />
            </motion.div>

            {/* Quick View Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 px-4 py-2 rounded-full shadow-lg hover:bg-pink-50 transition-colors font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetProductDetails(product.id);
                }}
              >
                Quick View
              </motion.button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 flex flex-col flex-grow bg-white bg-opacity-70 backdrop-blur-sm">
            {/* Category Badge */}
            {product.category && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-medium w-fit"
              >
                {product.category}
              </motion.span>
            )}

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base font-playfair font-bold line-clamp-2 leading-tight text-gray-800 group-hover:text-pink-600 transition-colors"
            >
              {product.name}
            </motion.h2>

            {/* Rating */}
            {product.averageReview && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center"
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.averageReview || 0) ? "fill-current" : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-1">
                  ({product.averageReview.toFixed(1)})
                </span>
              </motion.div>
            )}

            {/* Price and Stock Container */}
            <div className="flex flex-col space-y-2 flex-grow">
              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between"
              >
                {discountPercentage ? (
                  <div className="flex items-center gap-2">
                    <p className="text-gray-400 line-through text-sm">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-pink-600 text-xl font-bold">
                      ${displayPrice.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-pink-600 text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </motion.div>

              {/* Stock Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center"
              >
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-700' 
                    : product.stock > 0 
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                }`}>
                  {product.stock > 10 
                    ? 'In Stock' 
                    : product.stock > 0 
                      ? `${product.stock} left`
                      : 'Out of stock'
                  }
                </span>
              </motion.div>
            </div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-auto pt-2"
            >
              {product.stock === 0 ? (
                <Button
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium shadow-md transition-all duration-200 cursor-not-allowed py-3"
                  size="sm"
                  disabled
                >
                  <BsCartPlus className="mr-2 w-4 h-4" />
                  Out of Stock
                </Button>
              ) : (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full btn-flower py-3"
                    size="sm"
                  >
                    <BsCartPlus className="mr-2 w-4 h-4" />
                    View Details
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default UserProductCard;
