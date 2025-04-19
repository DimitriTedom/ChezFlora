import React, { SetStateAction } from "react";
import CartItemComponent from "@/pages/Shopping-view/Carts/ShoopingCartItem";
import { SheetHeader } from "../ui/sheet";
import { Button } from "../ui/button";
import { Cart } from "@/store/shop/cartSlice"; // Ensure this type is exported from your cartSlice
import { useNavigate } from "react-router-dom";

// Define the props interface
interface UserCartWrapperProps {
  cart: Cart | undefined;
  setOpenCartSheet: React.Dispatch<SetStateAction<boolean>>;
}

const UserCartWrapper: React.FC<UserCartWrapperProps> = ({ cart,setOpenCartSheet }) => {
  console.log("cartWrappper:" ,cart)
  const navigate = useNavigate()
  const totalCartAmount: number =
    cart && cart?.items.length > 0
      ? cart?.items.reduce((sum, currentItem) => {
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
        {cart && cart?.items.length > 0 ? (
          cart?.items.map((item) => (
            <CartItemComponent key={item.id} cartItem={item} />
          ))
        ) : (
          <div className="space-y-4 text-center">
            <img src="/yourCartIsEmpty.svg" alt="Your cart is empty" />
            <p className="text-gray-500 text-2xl font-bold">Your cart is empty.</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center w-full justify-between">
          <h1>Total</h1>
          <p className="text-xl font-bold">${totalCartAmount.toFixed(2)}</p>
        </div>
        <Button
          onClick={()=>{navigate('/shop/checkout');
            setOpenCartSheet(false)}
          }
          className="bg-pink-300 hover:bg-pink-400 text-white font-semibold rounded-full"
        >
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default UserCartWrapper;
