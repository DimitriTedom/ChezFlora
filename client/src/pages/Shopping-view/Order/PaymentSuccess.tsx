import React from 'react';
import Confetti from 'react-confetti'; // optional library for confetti effect
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const PaymentSuccessPage = () => {
  const history = useNavigate();
  const {orderId} = useSelector((state: RootState) => state.shopOrder);
  // Example order data; in a real app, you might fetch this using the orderId from session or context.
  const orderSummary = {
    orderNumber: "12345",
    totalAmount: "$418.30",
    deliveryDate: "Expected by April 5, 2025",
  };

  const handleContinueShopping = () => {
    history("/shop/home");
  };
  const handleViewOrderDetails = () => {
    history(`/shop/detail/${orderSummary.orderNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Confetti effect for celebration */}
      <Confetti recycle={false} numberOfPieces={200} />
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-green-600">Congratulation 🎉!</h1>
        <p className="text-lg mb-2">Your payment was successful.</p>
        <p className="mb-4">
          Order <span className="font-semibold">#{orderSummary.orderNumber}</span> totaling <span className="font-semibold">{orderSummary.totalAmount}</span> has been confirmed.
        </p>
        <p className="mb-6">Estimated Delivery: {orderSummary.deliveryDate}</p>
        <div className="flex flex-col gap-4">
          <Button onClick={handleViewOrderDetails} className="w-full">
            View Order Details
          </Button>
          <Button onClick={handleContinueShopping} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;