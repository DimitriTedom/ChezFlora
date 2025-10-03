import React from "react";
import { motion } from "framer-motion";
import { useLazyLoading } from "@/hooks/useIntersectionObserver";
import LazyImage from "@/components/Common/LazyImage";
import { ProductCardSkeleton } from "@/components/Common/LazyWrapper";

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  salePrice?: number;
  totalStock: number;
  averageReview: number;
  category: string;
  brand: string;
}

interface LazyProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  index: number;
}

const LazyProductCard: React.FC<LazyProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  index
}) => {
  const { targetRef, isIntersecting } = useLazyLoading({
    threshold: 0.1,
    rootMargin: "100px"
  });

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const cardVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 40px rgba(255, 182, 193, 0.3)",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  if (!isIntersecting) {
    return (
      <div ref={targetRef}>
        <ProductCardSkeleton />
      </div>
    );
  }

  const discount = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <motion.div
      ref={targetRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group"
    >
      <motion.div
        variants={cardVariants}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-pink-100"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden h-64">
          <motion.div
            variants={imageVariants}
            className="w-full h-full"
          >
            <LazyImage
              src={product.image}
              alt={product.title}
              className="w-full h-full"
              fallbackSrc="/placeholder-flower.png"
            />
          </motion.div>
          
          {/* Discount Badge */}
          {discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
            >
              -{discount}%
            </motion.div>
          )}

          {/* Quick Actions Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewDetails(product)}
              className="bg-white text-pink-600 p-3 rounded-full shadow-lg hover:bg-pink-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product)}
              className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 10h10a2 2 0 002-2V7H7v6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21a2 2 0 100-4 2 2 0 000 4zM20 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Category Badge */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-medium mb-3"
          >
            {product.category}
          </motion.span>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-playfair text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors"
          >
            {product.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-sm mb-4 line-clamp-2"
          >
            {product.description}
          </motion.p>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center mb-4"
          >
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.averageReview) ? "fill-current" : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-2">
              ({product.averageReview.toFixed(1)})
            </span>
          </motion.div>

          {/* Price Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold text-pink-600">
                    ${product.salePrice}
                  </span>
                  <span className="text-gray-500 line-through text-sm">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-pink-600">
                  ${product.price}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <span className={`text-xs px-2 py-1 rounded-full ${
              product.totalStock > 10 
                ? "bg-green-100 text-green-700" 
                : product.totalStock > 0 
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}>
              {product.totalStock > 10 
                ? "In Stock" 
                : product.totalStock > 0 
                  ? `${product.totalStock} left`
                  : "Out of Stock"
              }
            </span>
          </motion.div>

          {/* Add to Cart Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(product)}
            disabled={product.totalStock === 0}
            className="w-full mt-4 btn-flower disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
          >
            {product.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LazyProductCard;