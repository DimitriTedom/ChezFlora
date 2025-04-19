import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { events } from "@/config"

 function EventCarousel() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.id}>
                <div className="flex flex-col aspect-square items-start justify-center relative">
                  <img src={event.imageUrl} alt={event.title}  className="object-cover w-full h-full rounded-xl"/>
                  <div>
                    <h1>{event.title}</h1>
                    <p className="text-gray-400">${event.price}</p>
                  </div>
                </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={`absolute top-[40%] left-[-5%]`}/>
      <CarouselNext className="absolute top-[40%] right-[-5%]"/>
    </Carousel>
  )
}
export default EventCarousel