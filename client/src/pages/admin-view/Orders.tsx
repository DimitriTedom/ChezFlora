import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import AdminOrderDetail from "@/components/Admin-view/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAllOrdersofAllUsers, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/OrderSlice";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/store/shop/OrderSlice";

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
  const {orderList,orderDetails,isLoading} = useSelector((state:RootState) => state.adminOrder);
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const handleFetchOrderDetails = (getId:string) => {
    dispatch(getOrderDetailsForAdmin(getId)) 
    setSelectedOrderId(getId);
    setOpenDetailsDialog(true);
  }
  useEffect(()=>{
    dispatch(getAllOrdersofAllUsers())
    
  },[dispatch])
  // useEffect(()=>{
  //   if (orderDetails !== null) {
  //     setOpenDetailsDialog(true);
  //   }
  // },[orderDetails])
  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
    setSelectedOrderId(null);
  };
  console.log(orderList,"orderList");
  console.log(orderDetails,"orderDetails");
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {orderList &&
              orderList.length > 0 &&
              orderList.map((orderItem: Order) => (
                <TableRow key={orderItem.id}>
                  <TableCell>#{orderItem.id}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-0 px-3 ${
                        orderItem.orderStatus === "DELIVERED"
                          ? "bg-green-500"
                          : orderItem.orderStatus === "PENDING"
                          ? "bg-yellow-300"
                          : orderItem.orderStatus === "PROCESSING"
                          ? "bg-blue-500"
                          : orderItem.orderStatus === "SHIPPING"
                          ? "bg-purple-500"
                          : orderItem.orderStatus === "CANCELLED"
                          ? "bg-gray-500"
                          : orderItem.orderStatus === "APPROVED"
                          ? "bg-teal-500"
                          : orderItem.orderStatus === "REJECTED"
                          ? "bg-red-600"
                          : "bg-red-500"
                      }`}
                    >
                      {orderItem.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{orderItem.orderDate.split("T")[0]}</TableCell>
                  <TableCell>${orderItem.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={handleCloseDialog}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem.id)}
                          disabled={isLoading}
                        >
                          View Detail
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        {orderDetails && selectedOrderId && orderDetails.id === selectedOrderId ? (
                          <AdminOrderDetail orderDetails={orderDetails} />
                        ) : (<p>Loading...</p>)}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrders