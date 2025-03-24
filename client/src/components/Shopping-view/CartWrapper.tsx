import CartItem from "@/pages/Shopping-view/Carts/ShoopingCartItem"
import { SheetHeader } from "../ui/sheet"
import { Button } from "../ui/button"

const UserCartWrapper = ({cartItems}) => {
  const totalCartAmount = cartItems && cartItems.length > 0 ? cartItems.reduce((sum,currentItem)=> sum + (currentItem?.product.saleprice> 0 ? currentItem?.product.saleprice : currentItem?.product.price)*currentItem.quantity,0) : 0;
  return (
    <div className="w-full">
        <SheetHeader className="mb-8">Your Cart</SheetHeader>
        <div className="flex flex-col gap-6">

      {
        cartItems && cartItems.length > 0 ? 
        cartItems.map(item => <CartItem cartItem={item}/>) : null
      }
        </div>

      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center w-full justify-between">
          <h1>Total</h1>
         <p className="text-xl font-bold">${totalCartAmount}</p>
        </div>
        <Button
        // onClick={onCheckout}
       className="bg-pink-300 hover:bg-pink-400 text-white font-semibold rounded-full"
         >
           Checkout Now
         </Button>
       </div>
    </div>
  )
}

export default UserCartWrapper