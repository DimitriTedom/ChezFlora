import Confetti from "react-confetti"; // optional library for confetti effect
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Clock, Package, CreditCard, MapPin, Info } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { getOrderDetails } from "@/store/shop/OrderSlice";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import FormTitle from "@/components/Common/FormTitle";
import { Helmet } from "react-helmet-async";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { orderDetails } = useSelector((state: RootState) => state.shopOrder);
  const orderId = JSON.parse(
    sessionStorage.getItem("currentOrderId") || "null"
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId, dispatch]);

  const handleContinueShopping = () => {
    sessionStorage.removeItem("currentOrderId");
    navigate("/shop/home");
  };

  console.log(orderId);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Payment Successful | ChezFlora</title>
        <meta
          name="description"
          content="Your payment was processed successfully. A confirmation email has been sent."
        />
        <meta property="og:title" content="Payment Successful | ChezFlora" />
        <meta
          property="og:description"
          content="Your ChezFlora order is confirmed! We’ll notify you when it ships."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/shop/payment-success"
        />
        <meta
          property="og:image"
          content="https://www.chezflora.com/images/payment-success-preview.jpg"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Helmet>
      <FormTitle title="Congratulations 🎉 !" />
      <Confetti recycle={false} numberOfPieces={1000} />
      <Card className="max-w-[800px] p-8 rounded-lg shadow-xl">
        <div className="grid gap-8">
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
                <p className="text-sm">Method: {orderDetails.paymentMethod}</p>
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
        <Button
          className="w-full mt-4 rounded-full bg-pink-300 hover:bg-pink-500 transition-colors duration-200"
          onClick={handleContinueShopping}
        >
          Continue to shop
        </Button>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
