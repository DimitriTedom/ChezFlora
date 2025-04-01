import { Button } from "../ui/button";
import { Star } from "lucide-react";

const StarRating = ({ rating, handleRatingChange }: { rating: number, handleRatingChange?: (rating: number) => void }) => {
  return (
    <div className="flex">
      {[1,2,3,4,5].map((star, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          className={`p-2 transition-colors rounded-full duration-200 ease-in-out ${
            star <= rating ? "text-pink-400 hover:text-yellow-400" : "text-gray-400 hover:text-pink-400"
          }`}
          onClick={handleRatingChange ? () => handleRatingChange(star) : () => {}} // Ensure we pass index + 1
        >
          <Star className={`w-6 h-6 ${star <= rating ? "fill-pink-400" : "fill-gray-400"}`} />
        </Button>
      ))}
    </div>
  );
};

export default StarRating;
