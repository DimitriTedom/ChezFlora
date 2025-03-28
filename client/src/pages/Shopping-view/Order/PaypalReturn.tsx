import { useCustomToast } from '@/hooks/useCustomToast'
import { capturePayment } from '@/store/shop/OrderSlice'
import { AppDispatch } from '@/store/store'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const PaypalReturnPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get('paymentId');
  const {showToast} = useCustomToast()
  const payerId = params.get('PayerID');
alert("we are on the return page")
  useEffect(()=>{
    if (payerId && paymentId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId") || "null");
      dispatch(capturePayment({paymentId, payerId, orderId})).unwrap().then((data)=>{
        console.log(data,"after capture payment")
        if(data.success){
          sessionStorage.removeItem("currentOrderId");
          showToast({
            message: data.message,
            type: "success",
            subtitle:"Redirecting to Payment Success...",
            duration: 5000,
          })
          window.location.href = "/shop/payment-success";
        }
      })
    }
  },[paymentId,payerId,dispatch])
  return (
    <div className='mt-16'>PaypalReturnPage</div>
  )
}

export default PaypalReturnPage