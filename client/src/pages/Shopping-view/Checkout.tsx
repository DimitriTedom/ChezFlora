import Address from "@/components/Shopping-view/Address";
import { RootState } from "@/store/store";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import CartItemComponent from "@/pages/Shopping-view/Carts/ShoopingCartItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ShoppingCheckout = () => {
  const {cartItems} = useSelector((state:RootState) => state.shoppingCart)
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
    const navigate = useNavigate()
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
          <Address/>
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
          onClick={()=>navigate('/shop/checkout')}
          className="bg-pink-300 hover:bg-pink-400 text-white font-semibold rounded-full w-full"
        >
          Checkout Now
        </Button>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
