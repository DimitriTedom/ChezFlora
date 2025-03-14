import { BsCartPlus } from "react-icons/bs"; 
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
interface Product {
  title: string;
  price: number;
  units: number;
  image: string;
  discount?: number; // Optional discount field
}

const ProductCard: React.FC<Product> = ({ title, price, units, image, discount }) => {
  const [quantity, setQuantity] = useState(units);

  const handleAddToCart = () => {
    console.log(`${title} ajouté au panier`);
  };

  const discountedPrice = discount ? price * (1 - discount / 100) : price;

  return (
    <div className="bg-[#FFF7E0] rounded-[2rem] shadow-md overflow-hidden relative border-2 border-Maron">
      {discount && (
        <Badge className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-sm font-bold rounded-full">
          -{discount}% today
        </Badge>
      )}
      <img src={image} alt={title} className="w-full object-cover" />
      <div className="p-4 flex flex-col gap-6">
        <div className='flex w-full justify-between items-center'>
          <h2 className="text-2xl font-Poppins font-extrabold mb-2 truncate">{title}</h2>
          <p className="text-gray-600 mb-4">{units} unit{units !== 1 ? 's' : ''}</p>
        </div>
        {discount ? (
          <div className='flex justify-between w-full'>
            <p className="text-gray-700 line-through mb-1 font-bold">${price.toFixed(2)}</p>
            <p className="text-green-600 font-bold mb-2">${discountedPrice.toFixed(2)}</p>
          </div>
        ) : (
          <p className="text-gray-700 mb-2">${price.toFixed(2)}</p>
        )}
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-pink-200 text-black hover:bg-pink-300 shadow-md font-bold border border-Green"
        >
          <BsCartPlus />
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;