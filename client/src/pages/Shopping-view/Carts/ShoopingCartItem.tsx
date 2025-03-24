"use client";

import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteCartITems, updateCartIemQty } from "@/store/shop/cartSlice";
import { useCustomToast } from "@/hooks/useCustomToast";


function CartItem({ cartItem }) {
    const {user} = useSelector((state:RootState)=>state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const {showToast} = useCustomToast()
    const handleCartItemDelete = (getCartItem) =>{
        console.log(getCartItem, "handledelete")
        dispatch(deleteCartITems({userId:user?.id ,productId: getCartItem?.productId})).unwrap().then((response)=>{
            if (response?.success) {
                showToast({
                    message: response?.message || "Product deleted successfully",
                    type: "success",
                    duration:5000
                })
            }
        })
    }
    const handleUpdateQty = (getCartItem,typeOfAction) =>{
        dispatch(updateCartIemQty({userId:user?.id,productId: getCartItem?.productId ,quantity: typeOfAction === 'plus' ? getCartItem?.quantity+1 : getCartItem?.quantity-1})).unwrap().then((response)=>{
                if (response?.success) {
                    showToast({
                        message: response?.message || "Product Qty Updated successfully",
                        type: "success",
                        duration:2000
                    })
                }
            
        })
    }
  return (
    <Card className="w-full max-w-md mx-auto border shadow-sm">
      <div className="p-2"></div>

      {/* Card Content: Image, Title, and Quantity Controls */}
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <img
            src={cartItem?.product.image}
            alt={cartItem?.product.title}
            className="w-20 h-20 object-cover rounded-md"
          />

          <div className="flex-1 flex flex-col justify-between">
            {/* Title + Remove Icon */}
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-md">
                {cartItem?.product.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={()=>handleCartItemDelete(cartItem)}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 mt-3">
              <Button variant="outline" size="icon" onClick={()=>handleUpdateQty(cartItem, 'minus')} disabled={cartItem?.quantity === 1}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-medium">{cartItem?.quantity}</span>
              <Button variant="outline" size="icon"  onClick={()=>handleUpdateQty(cartItem, 'plus')}>
                <Plus className="w-4 h-4"/>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full justify-between">
          <h5 className="text-sm">Total</h5>
          <p className="text-lg font-bold">
            $
            {(
              (cartItem?.product.saleprice > 0
                ? cartItem?.product.saleprice
                : cartItem?.product.price) * cartItem.quantity
            ).toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartItem;
