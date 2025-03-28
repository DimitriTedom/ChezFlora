import Address from "@/components/Shopping-view/Address";
import { AppDispatch, RootState } from "@/store/store";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import CartItemComponent from "@/pages/Shopping-view/Carts/ShoopingCartItem";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
import { CartItem } from "@/store/shop/cartSlice";
import React, { useEffect, useState } from "react";
import { AddressData } from "@/components/Shopping-view/AddressCard";
import { createNewOrder } from "@/store/shop/OrderSlice";
import { useCustomToast } from "@/hooks/useCustomToast";

const ShoppingCheckout = () => {
  const {cartItems} = useSelector((state:RootState) => state.shoppingCart)
  const {user} = useSelector((state:RootState) => state.auth)
  const [currentSelectedAddress,setCurrentSelectedAddress] = React.useState<AddressData>({
    id: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    notes: '',
  });
  const [isPaymentStart,setIsPaymentStart] = useState<boolean>(false);
  const {approvalURL,isLoading} = useSelector((state:RootState)=>state.shopOrder)
  const dispatch = useDispatch<AppDispatch>()
  const {showToast}= useCustomToast()
  const totalCartAmount: number =
  cartItems && cartItems.items && cartItems.items.length > 0
    ? cartItems.items.reduce((sum, currentItem) => {
        const price =
          currentItem.product && currentItem.product.saleprice && currentItem.product.saleprice > 0
            ? currentItem.product.saleprice
            : currentItem.product.price;
        return sum + price * currentItem.quantity;
      }, 0)
    : 0;
    // const navigate = useNavigate()
  const  handleInitiatePayapalPayment = () =>{
    const orderData = {
      userId:user?.id,
      cartId: cartItems?.id,
      cartItems: cartItems.items.map((singleCartItem :CartItem)=>({
        productId : singleCartItem.productId,
        title     : singleCartItem.product.name,
        image     : singleCartItem.product.image,
        price     : singleCartItem.product.saleprice > 0 ? singleCartItem.product.saleprice : singleCartItem.product.price,
        quantity  : singleCartItem.quantity,
      })),
      addressInfo:{
        addressId: currentSelectedAddress.id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        postalCode: currentSelectedAddress.postalCode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      orderStatus: 'PENDING',
      paymentMethod: 'paypal',
      paymentStatus : 'PENDING',
      totalAmount : totalCartAmount,
      orderDate : new Date(),
      orderUpdateDate : new Date(),
      paymentId : '',
      payerId: '',
    }
    dispatch(createNewOrder(orderData)).unwrap().then((data)=>{
      if(data?.success){
        setIsPaymentStart(true)
        showToast({
          message:data.message,
          type:"success",
          subtitle: "You will soone be redirected to payment page",
          duration:5000
        })
      }else{
        setIsPaymentStart(false)
      }
    }).catch((error)=>{

      showToast({
        message:'An error Occcured',
        type:"error",
        duration:3000
      })
    })
  }
  // useEffect(()=>{

  // },[approvalURL,dispatch])
  if(approvalURL){
    window.location.href = approvalURL;
  }
  return (
    <div>
      <Helmet>
        <title>Secure Checkout - ChezFlora Payment</title>
        <meta
          name="description"
          content="Complete your order securely with fast delivery. Choose from credit card, PayPal, or bank transfer. Free shipping on orders over €50."
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content="ChezFlora Payment & Delivery" />
        <meta
          property="og:description"
          content="Fast, secure payment options and eco-friendly packaging. Track your order in real-time."
        />
        <meta property="og:image" content="/assets/og-checkout.jpg" />{" "}
        {/* Payment confirmation mockup */}
      </Helmet>
      <div className="mt-32 flex flex-col">
        <div className="relative h-[300px] w-full overflow-hiddden">
          <img src="/account.jpg" alt="checkout image" className="h-full w-full object-cover object-center"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  p-5">
          <Address
          selectedId={currentSelectedAddress.id}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
          <div className="flex flex-col lg:px-6 gap-4  w-full">
          {cartItems && cartItems?.items && cartItems.items.length > 0 ? (
          cartItems.items.map((item) => (
            <CartItemComponent key={item.id} cartItem={item} />
          ))
        ) : (
          <p className="text-gray-500 text-4xl font-bold">Your cart is empty.</p>
        )}
          <div className="flex flex-col items-center gap-4 mt-6 lg:px-4">
        <div className="flex items-center w-full justify-between">
          <h1>Total</h1>
          <p className="text-xl font-bold">${totalCartAmount.toFixed(2)}</p>
        </div>
        <Button
          onClick={handleInitiatePayapalPayment}
          className="bg-pink-300 hover:bg-pink-400 text-white font-semibold rounded-full w-full"
        >
         {isLoading ? "please wait..." : "Checkout with Paypal"}
        </Button>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
