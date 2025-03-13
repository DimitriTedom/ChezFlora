import { FaSearchengin } from "react-icons/fa"; 
import { BiGift } from "react-icons/bi"; 
import {Button} from '@/components/ui/button'
<BiGift />
const ShoppingHome = () => {
  return (
    <div className="w-full overflow-x-hidden">
          <div className="w-48 h-48 rounded-full bg-pink-100 blur-3xl absolute z-[-2] left-[10%] lg:w-60 lg:h-60"></div>
      {/* Hero Section */}
      <section className="w-full h-full flex flex-col gap-8 lg:flex-row lg:justify-between xl:justify-between">
        <div className="flex flex-col gap-6 lg:max-w-[45%]">
          <h1 className="text-3xl lg:text-6xl font-bold font-Poppins lg:mt-8">Decorate your life with nature</h1>
          <p className="text-gray-700 lg:text-2xl">Let nature inspire you to cultivate a lifestyle that is both beautiful and harmonious with the world around you and take time to appreciate the changing seasons.</p>
          <div className="relative">
            <FaSearchengin className="absolute top-3 left-4 text-white"/>
            <Button className="bg-pink-300 rounded-full px-6 py-3 pl-10 hover:bg-pink-400 cursor-pointer">Start your search</Button>
          </div>
          </div> 
          <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-green-100 blur-3xl absolute z-[-2] right-0 top-[20%] lg:left-[15%]"></div>
          <div>
            <img src="/flowerGen5.jpg" alt="heroImage" className="rounded-[2rem] lg:h-[80%] lg:w-[100%] xl:h-[100%]"/>
          </div>
          <div className="hidden lg:block absolute bg-slate-500 w-[20rem] h-[3rem] lg:bottom-[60%] xl:bottom-[68%]">

          </div>
      </section>
    </div>
  )
}

export default ShoppingHome