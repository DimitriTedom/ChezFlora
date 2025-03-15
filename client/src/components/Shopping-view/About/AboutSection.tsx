// import flower1 from "/flower1.jpg"; // Adjust path to your images
// import flower2 from "/flower2.jpg";
// import flower3 from "/flower3.jpg";
// import flower4 from "/flower4.jpg";
// import flower5 from "/flowerGen1.jpg";
import flower6 from "/about.png";
const AboutHeroSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="w-48 h-48 rounded-full bg-pink-100 blur-3xl absolute z-[-2] left-[10%] lg:w-60 lg:h-60"></div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="max-w-md space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold font-Poppins xl:text-4xl">🌿 About ChezFlora</h1>
          <p className="text-gray-700 ">
            Since 2016, we've been crafting artisanal floral arrangements with a focus on sustainability. 
            From wedding bouquets to corporate event decorations, we bring nature's beauty to life.
          </p>
        </div>

        {/* Image Grid */}
        <div className="">
          {/* <div className="relative overflow-hidden rounded-lg shadow-lg h-48 md:h-32">
            <img
              src={flower1}
              alt="Floral arrangement 1"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg h-48 md:h-64">
            <img
              src={flower2}
              alt="Floral arrangement 2"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg h-64 md:h-96">
            <img
              src={flower5}
              alt="Floral arrangement 5 (Central)"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg h-48 md:h-64">
            <img
              src={flower3}
              alt="Floral arrangement 3"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg h-48 md:h-32">
            <img
              src={flower4}
              alt="Floral arrangement 4"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div> */}
        <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-green-100 blur-3xl absolute z-[-2] right-0 top-[20%] lg:left-[15%]"></div>
          <img src={flower6} className="w-full h-full scale-110" alt="floral arangement" />
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;