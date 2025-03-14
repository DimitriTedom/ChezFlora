import { AiFillStar } from "react-icons/ai";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export interface Testimonial {
  text: string;
  name: string;
  imageUrl: string;
  tagline: string;
  rating: number;
}

const TestimonialCard: React.FC<Testimonial> = ({
  text,
  name,
  imageUrl,
  tagline,
  rating,
}) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, index) => (
          <AiFillStar
            key={index}
            className="w-5 h-5 text-yellow-500 md:w-6 md:h-6"
          />
        ))}
        {hasHalfStar && (
          <AiFillStar
            className="w-5 h-5 text-yellow-500 opacity-50 md:w-6 md:h-6"
          />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <AiFillStar
            key={index + fullStars + (hasHalfStar ? 1 : 0)}
            className="w-5 h-5 text-gray-300 md:w-6 md:h-6"
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-20 blur-md" />
      <div className="relative z-10 space-y-4">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {text}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-white shadow-lg">
              <AvatarImage
                src={imageUrl}
                alt={name}
                className="object-cover"
              />
            </Avatar>
            <div className="text-center sm:text-left">
              <h5 className="text-base sm:text-lg font-medium text-gray-900">
                {name}
              </h5>
              <p className="text-xs sm:text-sm text-gray-500">{tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {renderStars(rating)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;