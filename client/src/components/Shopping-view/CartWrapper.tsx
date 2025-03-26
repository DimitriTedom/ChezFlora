import React from "react";
import CartItemComponent from "@/pages/Shopping-view/Carts/ShoopingCartItem";
import { SheetHeader } from "../ui/sheet";
import { Button } from "../ui/button";
import { CartItem as CartItemType } from "@/store/shop/cartSlice"; // Ensure this type is exported from your cartSlice
import { useNavigate } from "react-router-dom";

// Define the props interface
interface UserCartWrapperProps {
  cartItems: CartItemType[];
}

const UserCartWrapper: React.FC<UserCartWrapperProps> = ({ cartItems }) => {
  // Calculate the total amount in the cart.
  // It uses the saleprice if available and > 0, otherwise falls back to the product price.
  const navigate = useNavigate()
  const totalCartAmount: number =
    cartItems && cartItems.length > 0
      ? cartItems.reduce((sum, currentItem) => {
          const price =
            currentItem.product && currentItem.product.saleprice && currentItem.product.saleprice > 0
              ? currentItem.product.saleprice
              : currentItem.product.price;
          return sum + price * currentItem.quantity;
        }, 0)
      : 0;

  return (
    <div className="w-full">
      <SheetHeader className="mb-8">Your Cart</SheetHeader>
      <div className="flex flex-col gap-6">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItemComponent key={item.id} cartItem={item} />
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center w-full justify-between">
          <h1>Total</h1>
          <p className="text-xl font-bold">${totalCartAmount.toFixed(2)}</p>
        </div>
        <Button
          onClick={()=>navigate('/shop/checkout')}
          className="bg-pink-300 hover:bg-pink-400 text-white font-semibold rounded-full"
        >
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default UserCartWrapper;
