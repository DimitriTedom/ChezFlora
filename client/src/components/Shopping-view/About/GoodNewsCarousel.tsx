import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Testimonials = [
  {
    id: 1,
    avatar: "/avatar3.svg",
    name: "Tiana Rogrinho",
    location: "Malaysia",
    quote: "This place is exactly like the picture posted on ChezFlora. Great service, we had a great stay!",
  },
  {
    id: 2,
    avatar: "/avatar1.svg",
    name: "John Doe",
    location: "Canada",
    quote: "ChezFlora exceeded our expectations. The hospitality was top-notch!",
  },
  {
    id: 3,
    avatar: "/avatar2.svg",
    name: "Jane Smith",
    location: "Australia",
    quote: "A perfect blend of comfort and luxury. Highly recommended!",
  },
];

export function TestimonialCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <div className="bg-rose-200 p-8 relative w-full mx-auto">

      <Carousel
        value={currentSlide}
        onValueChange={(value) => setCurrentSlide(value)}
        orientation="horizontal"
        loop
        className="w-full"
        transition={0.3}
      >
        <CarouselContent>
          {Testimonials.map((testimonial, index) => (
            <CarouselItem key={testimonial.id}>
              <div className="p-6 md:p-8 bg-white/25 rounded-lg shadow-md flex flex-col items-center gap-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-4"
                />
                <p className="text-lg md:text-xl font-medium text-center text-gray-800 leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-lg md:text-xl font-bold text-gray-900">{testimonial.name}</span>
                  <span className="text-sm md:text-base text-gray-500">
                    <span className="text-red-500 mr-1">📍</span>
                    {testimonial.location}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100" />
      </Carousel>

      {/* Enhanced Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {Testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 
              ${currentSlide === index ? 'bg-black' : 'bg-gray-300'}
              ${currentSlide === index ? 'scale-110' : 'scale-90'}
            `}
          >
            {currentSlide === index && (
              <span className="absolute inset-0 rounded-full bg-black animate-ping"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TestimonialCarousel;