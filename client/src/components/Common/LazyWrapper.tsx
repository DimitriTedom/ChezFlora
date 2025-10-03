import React, { Suspense } from "react";
import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "rectangle";
  animate?: boolean;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = "",
  variant = "rectangle",
  animate = true
}) => {
  const baseClasses = "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded";
  
  const variantClasses = {
    card: "h-64 w-full",
    text: "h-4 w-full",
    circle: "h-12 w-12 rounded-full",
    rectangle: "h-8 w-full"
  };

  const skeletonClass = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (animate) {
    return (
      <motion.div
        className={`${skeletonClass} shimmer`}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  }

  return <div className={`${skeletonClass} shimmer`} />;
};

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  delay?: number;
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback,
  className = "",
  delay = 0
}) => {
  const defaultFallback = (
    <div className={`space-y-4 ${className}`}>
      <LoadingSkeleton variant="card" />
      <div className="space-y-2">
        <LoadingSkeleton variant="text" className="w-3/4" />
        <LoadingSkeleton variant="text" className="w-1/2" />
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: delay,
          ease: "easeOut" 
        }}
        className={className}
      >
        {children}
      </motion.div>
    </Suspense>
  );
};

// Specific loading components for different sections
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <LoadingSkeleton variant="card" className="h-48" />
    <div className="p-4 space-y-3">
      <LoadingSkeleton variant="text" className="h-6 w-3/4" />
      <LoadingSkeleton variant="text" className="h-4 w-1/2" />
      <div className="flex justify-between items-center">
        <LoadingSkeleton variant="text" className="h-6 w-20" />
        <LoadingSkeleton variant="rectangle" className="h-8 w-24" />
      </div>
    </div>
  </div>
);

export const HeaderSkeleton: React.FC = () => (
  <div className="flex items-center justify-between p-4 bg-white shadow-sm">
    <LoadingSkeleton variant="rectangle" className="h-8 w-32" />
    <div className="flex space-x-4">
      <LoadingSkeleton variant="circle" />
      <LoadingSkeleton variant="circle" />
      <LoadingSkeleton variant="circle" />
    </div>
  </div>
);

export const CategorySkeleton: React.FC = () => (
  <div className="flex space-x-4 overflow-x-auto p-4">
    {Array.from({ length: 6 }).map((_, index) => (
      <LoadingSkeleton
        key={index}
        variant="rectangle"
        className="h-10 w-24 flex-shrink-0"
      />
    ))}
  </div>
);

// Higher-order component for lazy loading
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  return React.forwardRef<any, T>((props, ref) => (
    <LazyWrapper fallback={fallback}>
      <Component {...(props as any)} ref={ref} />
    </LazyWrapper>
  ));
}

export default LazyWrapper;