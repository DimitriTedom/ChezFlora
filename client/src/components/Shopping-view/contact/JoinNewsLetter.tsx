import { Badge } from "@/components/ui/badge";
import JoinNewsLetter from "../JoinNewsLetter";
// If you're using Next.js, consider importing Image from "next/image" for optimized images.

const JoinNewsLetterComponent = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-12 px-4 md:px-8 lg:px-16 py-8">
      {/* Content Section */}
      <div className="flex flex-col gap-8 max-w-2xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold dark:text-white">
            Join our newsletter 🎉
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-normal dark:text-white/40 text-gray-400">
            Read and share new perspectives on just about any topic.
            <br />
            Everyone’s welcome.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-800 px-4 py-2 text-sm sm:text-[1.3rem] rounded-full font-semibold">
              01
            </Badge>
            <h3 className="text-base sm:text-lg md:text-[1.6rem]">Get more discount</h3>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-red-100 hover:bg-red-100 text-red-800 px-4 py-2 text-sm sm:text-[1.3rem] rounded-full font-semibold">
              02
            </Badge>
            <h3 className="text-base sm:text-lg md:text-[1.6rem]">Get premium magazines</h3>
          </div>
        </div>

        <JoinNewsLetter />
      </div>

      {/* Image Section */}
      <div className="w-full max-w-md lg:max-w-lg">
        <img
          // src="/news-removebg-preview.png"
          src="/joinUs.svg"
          alt="Illustration of joining the newsletter"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default JoinNewsLetterComponent;
