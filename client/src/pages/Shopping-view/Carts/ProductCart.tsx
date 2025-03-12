import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Product {
  title: string;
  price: number;
  units: number;
  image: string;
  discount?: number; // Ajout du champ discount (optionnel)
}

const ProductCard: React.FC<Product> = ({ title, price, units, image, discount }) => {
  const [quantity, setQuantity] = useState(units);

  const handleAddToCart = () => {
    // Logique pour ajouter au panier
    console.log(`${title} ajouté au panier`);
  };

  let discountedPrice = price;
  if (discount) {
    discountedPrice = price * (1 - discount / 100);
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      {discount && (
        <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-sm font-bold">
          -{discount}% today
        </div>
      )}
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {discount ? (
          <>
            <p className="text-gray-700 line-through mb-1">${price.toFixed(2)}</p>
            <p className="text-green-600 font-bold mb-2">${discountedPrice.toFixed(2)}</p>
          </>
        ) : (
          <p className="text-gray-700 mb-2">${price.toFixed(2)}</p>
        )}
        <p className="text-gray-600 mb-4">{quantity} unit</p>
        <Button onClick={handleAddToCart} className="w-full bg-pink-200 text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13v-2m6-3v9M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;