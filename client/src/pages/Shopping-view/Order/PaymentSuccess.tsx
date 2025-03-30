import Confetti from 'react-confetti'; // optional library for confetti effect
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { Clock, Package, CreditCard, MapPin, Info } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { getOrderDetails } from '@/store/shop/OrderSlice';

const PaymentSuccessPage = () => {
  const history = useNavigate();
  const {orderDetails,orderId} = useSelector((state: RootState) => state.shopOrder);
  // Example order data; in a real app, you might fetch this using the orderId from session or context.
  const dispatch = useDispatch<AppDispatch>()
    dispatch(getOrderDetails(orderId));


  const handleContinueShopping = () => {
    history("/shop/home");
  };
  const handleViewOrderDetails = () => {
    history(`/shop/detail/${orderSummary.orderNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Confetti effect for celebration */}
      <Confetti recycle={false} numberOfPieces={1000} />
      <Card className="max-w-[800px] p-8 rounded-lg shadow-xl">
      <div className="grid gap-8">
        {/* Order Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" />
            Order Details
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Order #{orderDetails.id}</span>
            <span>•</span>
            <span>{formatDate(orderDetails.orderDate)}</span>
          </div>
        </div>

        {/* Status & Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-accent/30 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <h3 className="font-medium">Order Status</h3>
            </div>
            <Badge
              className={`text-sm py-1 px-3 ${
                orderDetails.orderStatus === "DELIVERED"
                  ? "bg-green-500 hover:bg-green-600"
                  : orderDetails.orderStatus === "PENDING"
                  ? "bg-yellow-300 hover:bg-yellow-400"
                  : orderDetails.orderStatus === "PROCESSING"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : orderDetails.orderStatus === "SHIPPING"
                  ? "bg-purple-500 hover:bg-purple-600"
                  : orderDetails.orderStatus === "CANCELLED"
                  ? "bg-gray-500 hover:bg-gray-600"
                  : orderDetails.orderStatus === "APPROVED"
                  ? "bg-teal-500 hover:bg-teal-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {orderDetails.orderStatus}
            </Badge>
          </div>

          <div className="bg-accent/30 p-4 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5" />
              <h3 className="font-medium">Payment Information</h3>
            </div>
            <div className="space-y-1">
              <p className="text-sm">
                Method: {orderDetails.paymentMethod}
              </p>
              <Badge
                variant="outline"
                className={`${
                  orderDetails.paymentStatus === "PAID"
                    ? "border-green-500 text-green-600"
                    : "border-red-500 text-red-600"
                }`}
              >
                {orderDetails.paymentStatus}
              </Badge>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Items
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Product</th>
                  <th className="text-center py-3 px-4 font-medium">Price</th>
                  <th className="text-center py-3 px-4 font-medium">Qty</th>
                  <th className="text-right py-3 px-4 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.cartItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">{item.title}</td>
                    <td className="py-3 px-4 text-center">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Shipping Address
            </h3>
            <div className="space-y-1 text-sm bg-accent/30 p-4 rounded-lg border">
              <p>{orderDetails.addressInfo.address}</p>
              <p>
                {orderDetails.addressInfo.city},{" "}
                {orderDetails.addressInfo.postalCode}
              </p>
              <p>Phone: {orderDetails.addressInfo.phone}</p>
              {orderDetails.addressInfo.notes && (
                <div className="pt-2">
                  <p className="font-medium flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    Delivery Notes:
                  </p>
                  <p>{orderDetails.addressInfo.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Order Summary</h3>
            <div className="space-y-2 text-sm bg-accent/30 p-4 rounded-lg border">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${orderDetails.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${orderDetails.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
};

export default PaymentSuccessPage;