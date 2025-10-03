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
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400 drop-shadow-sm"
          />
        ))}
        {hasHalfStar && (
          <AiFillStar
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400 opacity-50 drop-shadow-sm"
          />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <AiFillStar
            key={index + fullStars + (hasHalfStar ? 1 : 0)}
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-300"
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-pink-100 hover:border-pink-200 h-full flex flex-col"
      whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-rose-50/60 to-purple-50/40 opacity-60" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-200/30 to-transparent rounded-bl-full" />
      
      <div className="relative z-10 space-y-4 sm:space-y-6 flex-1 flex flex-col">
        {/* Quote text with better typography */}
        <div className="flex-1">
          <div className="text-4xl text-pink-300 font-serif leading-none mb-2">"</div>
          <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed font-medium italic">
            {text}
          </p>
          <div className="text-4xl text-pink-300 font-serif leading-none text-right mt-2">"</div>
        </div>
        
        {/* Customer info section with improved layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-pink-100">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative">
              <Avatar className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 border-3 border-white shadow-lg ring-2 ring-pink-100">
                <AvatarImage
                  src={imageUrl}
                  alt={name}
                  className="object-cover"
                />
              </Avatar>
              {/* Online indicator dot */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left min-w-0 flex-1">
              <h5 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">
                {name}
              </h5>
              <p className="text-xs sm:text-sm lg:text-base text-gray-500 truncate">{tagline}</p>
            </div>
          </div>
          
          {/* Rating section with enhanced styling */}
          <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 bg-yellow-50 px-2 py-1 rounded-full">
              {rating.toFixed(1)} / 5.0
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;