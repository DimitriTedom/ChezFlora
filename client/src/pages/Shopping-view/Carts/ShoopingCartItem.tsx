"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteCartITems, updateCartIemQty, CartItem as CartItemType } from "@/store/shop/cartSlice";
import { useCustomToast } from "@/hooks/useCustomToast";

interface CartItemProps {
  cartItem: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useCustomToast();

  // Handler to delete a cart item.
  const handleCartItemDelete = (item: CartItemType) => {
    dispatch(deleteCartITems({ userId: user?.id!, productId: item.productId }))
      .unwrap()
      .then((response) => {
        if (response?.success) {
          showToast({
            message: response?.message || "Product deleted successfully",
            type: "success",
            duration: 5000,
          });
        }
      });
  };

  // Handler to update the quantity of a cart item.
  const handleUpdateQty = (item: CartItemType, action: "plus" | "minus") => {
    const newQuantity = action === "plus" ? item.quantity + 1 : item.quantity - 1;
    
    // If increasing, ensure newQuantity does not exceed product stock.
    if (action === "plus" && item.product.stock && newQuantity > item.product.stock) {
      showToast({
        message: "Cannot add more than available stock",
        type: "error",
        duration: 3000,
      });
      return;
    }
    // Prevent quantity from falling below 1.
    if (action === "minus" && newQuantity < 1) return;

    dispatch(updateCartIemQty({ userId: user?.id!, productId: item.productId, quantity: newQuantity }))
      .unwrap()
      .then((response) => {
        if (response?.success) {
          showToast({
            message: response?.message || "Product quantity updated successfully",
            type: "success",
            duration: 2000,
          });
        }
      });
  };

  // Calculate the total price for this cart item.
  const unitPrice =
    cartItem.product.saleprice && cartItem.product.saleprice > 0
      ? cartItem.product.saleprice
      : cartItem.product.price;
  const totalPrice = (unitPrice * cartItem.quantity).toFixed(2);

  return (
    <Card className="w-full  mx-auto border shadow-sm">
      <div className="p-2"></div>
      {/* Card Content: Image, Title, and Quantity Controls */}
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <img
            src={cartItem.product.image}
            alt={cartItem.product.name}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="flex-1 flex flex-col justify-between">
            {/* Title + Remove Icon */}
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-md">{cartItem.product.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCartItemDelete(cartItem)}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQty(cartItem, "minus")}
                disabled={cartItem.quantity === 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-medium">{cartItem.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQty(cartItem, "plus")}
                disabled={cartItem.product.stock ? cartItem.quantity >= cartItem.product.stock : false}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full justify-between">
          <h5 className="text-sm">Total</h5>
          <p className="text-lg font-bold">${totalPrice}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
