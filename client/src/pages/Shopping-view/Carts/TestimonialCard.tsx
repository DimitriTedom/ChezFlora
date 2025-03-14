import { AiFillStar } from "react-icons/ai"; 
import { Avatar, AvatarImage } from "@/components/ui/avatar";
{/* <AiFillStar /> */}
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
      <>
        {[...Array(fullStars)].map((_, index) => (
          <AiFillStar key={index} className="w-5 h-5 text-yellow-500" />
        ))}
        {hasHalfStar && <AiFillStar className="w-5 h-5 text-yellow-500 opacity-50" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <AiFillStar key={index + fullStars + (hasHalfStar ? 1 : 0)} className="w-5 h-5 text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-100 opacity-10 blur-md"></div>
      <div className="relative z-10">
        <p className="text-gray-700 mb-4">{text}</p>
        <div className="flex flex-col gap-4 lg:flex-row items-center justify-between">
          <div className="flex items-center justify-between lg:justify-start w-full">
            <Avatar className="w-16 h-16 mr-3">
              <AvatarImage src={imageUrl} alt={`Avatar of ${name}`} />
            </Avatar>
            <div>
              <h5 className="text-gray-900 font-medium">{name}</h5>
              <p className="text-gray-600">{tagline}</p>
            </div>
          </div>
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;