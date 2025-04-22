import Address from "@/components/Shopping-view/Address";
import { AppDispatch, RootState } from "@/store/store";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import CartItemComponent from "@/pages/Shopping-view/Carts/ShoopingCartItem";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/store/shop/cartSlice";
import React, { useState } from "react";
import { AddressData } from "@/components/Shopping-view/AddressCard";
import {
  createNewOrder,
  orderData,
  OrderStatus,
  PaymentStatus,
} from "@/store/shop/OrderSlice";
import { useCustomToast } from "@/hooks/useCustomToast";

const ShoppingCheckout = () => {
  const cart = useSelector((state: RootState) => state.shoppingCart.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] =
    React.useState<AddressData>({
      id: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      notes: "",
    });
  const [isPaymentStart, setIsPaymentStart] = useState<boolean>(false);
  const { approvalURL, isLoading } = useSelector(
    (state: RootState) => state.shopOrder
  );
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useCustomToast();
  const totalCartAmount: number =
    cart && cart?.items.length > 0
      ? cart?.items.reduce((sum: number, currentItem: CartItem) => {
          const price =
            currentItem.product &&
            currentItem.product.saleprice &&
            currentItem.product.saleprice > 0
              ? currentItem.product.saleprice
              : currentItem.product.price;
          return sum + price * currentItem.quantity;
        }, 0)
      : 0;
  // const navigate = useNavigate()
  const handleInitiatePayapalPayment = () => {
    if (cart?.items.length === 0) {
      showToast({
        message: "Your cart is empty.",
        subtitle: "Please add some items to your cart before checking out.",
        type: "error",
        duration: 3000,
      });
      return;
    }
    if (currentSelectedAddress.id === "") {
      showToast({
        message: "Please select an address to proceed",
        type: "error",
        duration: 3000,
      });
      return;
    }
    const orderData: orderData = {
      userId: user?.id,
      cartId: cart!.id,
      cartItems: cart!.items.map((singleCartItem: CartItem) => ({
        productId: singleCartItem.productId,
        title: singleCartItem.product.name,
        image: singleCartItem.product.image,
        price: singleCartItem.product.saleprice
          ? singleCartItem.product.saleprice > 0
            ? singleCartItem.product.saleprice
            : singleCartItem.product.price
          : singleCartItem.product.price,
        quantity: singleCartItem.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress.id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        postalCode: currentSelectedAddress.postalCode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      orderStatus: OrderStatus.PENDING,
      paymentMethod: "paypal",
      paymentStatus: PaymentStatus.PENDING,
      totalAmount: totalCartAmount,
      orderDate: new Date().toISOString(),
      orderUpdateDate: new Date().toISOString(),
      paymentId: "",
      payerId: "",
    };
    dispatch(createNewOrder(orderData))
      .unwrap()
      .then((data) => {
        if (data?.success) {
          setIsPaymentStart(true);
          showToast({
            message: data.message,
            type: "success",
            subtitle: "You will soon be redirected to payment page",
            duration: 5000,
          });
        } else {
          setIsPaymentStart(false);
        }
      })
      .catch((error) => {
        console.log(error);
        showToast({
          message: "An error Occcured",
          type: "error",
          duration: 3000,
        });
      });
  };
  // useEffect(()=>{

  // },[approvalURL,dispatch])
  if (approvalURL) {
    window.location.href = approvalURL;
  }
  console.log(isPaymentStart);
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
        <meta property="og:image" content="/assets/og-checkout.jpg" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        {/* Payment confirmation mockup */}
      </Helmet>
      <div className="mt-32 min-h-screen flex flex-col">
        <div className="relative h-[300px] w-full overflow-hiddden">
          <img
            src="/account2.jpg"
            alt="checkout image"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  p-5">
          <Address
            selectedId={currentSelectedAddress.id}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
          <div className="flex flex-col lg:px-6 gap-4  w-full">
            {cart && cart?.items.length > 0 ? (
              cart?.items.map((item: CartItem) => (
                <CartItemComponent key={item.id} cartItem={item} />
              ))
            ) : (
              <p className="text-gray-500 text-4xl font-bold">
                Your cart is empty.
              </p>
            )}
            <div className="flex flex-col items-center gap-4 mt-6 lg:px-4">
              <div className="flex items-center w-full justify-between">
                <h1>Total</h1>
                <p className="text-xl font-bold">
                  ${totalCartAmount.toFixed(2)}
                </p>
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
