import { FormEvent, useEffect, useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Separator } from '../ui/separator'
import CommonForm from '../Common/Form'
import { Order } from '@/store/shop/OrderSlice'
import { Clock, Package, CreditCard, MapPin, Info } from "lucide-react";
import { Badge } from "../ui/badge";
import { formatDate } from '@/lib/utils'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { getAllOrdersofAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin/OrderSlice'
import { useCustomToast } from '@/hooks/useCustomToast'
import { RootState } from '@/store/store'

interface Props {
    orderDetails: Order;
  }
const initialFormData = {
    status: '',
}
const AdminOrderDetail = ({ orderDetails }: Props) => {
  const [formData,setFormData] = useState(initialFormData)
  // const {user} = useSelector((state:RootState)=>state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const {showToast} = useCustomToast();
  const [isUpdating, setIsUpdating] = useState(false); // Pour afficher un loader pendant la mise à jour
  const updateStatus = useSelector((state:RootState) => state.adminOrder.status); 
  
  useEffect(() => {
    if (updateStatus === 'loading') {
          setIsUpdating(true);
        } else if (updateStatus === 'failed') {
          setIsUpdating(false);
          showToast({
            message: "Failed to Update Order Status",
            subtitle: "There was an error updating the order status. Please try again.",
            type: "error",
          });
        }
      }, [updateStatus, dispatch, showToast, orderDetails.id]);
      
      if (!orderDetails) return null;
    const handleSubmitUpdateStatus = async (e:FormEvent) =>{
        e.preventDefault()
        console.log(formData)
        const {status} = formData;
        try {
          
          dispatch(updateOrderStatus({id:orderDetails.id, orderStatus:status})).unwrap().then((data)=>{
            console.log(data);
            if(data?.success){
              showToast({
                message:data?.message,
                type:'success',
                duration:3000
              })
              dispatch(getOrderDetailsForAdmin(orderDetails.id));
              dispatch(getAllOrdersofAllUsers());
              setFormData(initialFormData);
            }
          })
        } catch (error) {
          
          showToast({
            message:error.message,
            subtitle:"An unexpected error occurred while updating the order.",
            type:'error',
            duration:2000
          })
          setIsUpdating(false);
        }  
    }
  return (
    <DialogContent className='max-w-[800px] p-8 rounded-lg shadow-xl'>
        <div className='flex flex-col items-center gap-3'>

      <div className="grid gap-8">
        {/* Order Header */}
        <div className="space-y-2">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            <Package className="w-6 h-6" />
            Order Details
          </h2>
          <Separator />
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

      <Separator />
            <div>
                <CommonForm 
                formControls={[
                    {
                        label: "Order Status",
                        name: "status",
                        component: "select",
                        placeholder: "Status",
                        options: [
                          { id: "PENDING", label: "Pending" },
                          { id: "PROCESSING", label: "Processing" },
                          { id: "SHIPPING", label: "Shipping" },
                          { id: "DELIVERED", label: "Delivered" },
                          { id: "CANCELLED", label: "Cancelled" },
                          { id: "APPROVED", label: "approved" },
                          { id: "REJECTED", label: "Rejected" },
                        ],
                      }
                ]}
                formData={formData}
                setFormData={setFormData}
                buttonText={isUpdating ? "Updating..." : "Update Order Status"}
                isBnDisabled={isUpdating}
                onSubmit={handleSubmitUpdateStatus}
                />
            </div>
        </div>
    </DialogContent>
)
}

export default AdminOrderDetail