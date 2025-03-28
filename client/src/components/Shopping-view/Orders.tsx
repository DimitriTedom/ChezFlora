import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetail from "./ShoppingOrderDetail";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUser,
  getOrderDetails,
  Order,
  resetOrderDetails,
} from "@/store/shop/OrderSlice";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, orderList, orderDetails } = useSelector(
    (state: RootState) => state.shopOrder
  );
  const handleFetchOrderDetails = (orderId: string) => {
    dispatch(getOrderDetails(orderId));
  };
  useEffect(() => {
    dispatch(resetOrderDetails());
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Date</TableHead>
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
                      onOpenChange={(open) => {
                        if (!open) {
                          dispatch(resetOrderDetails());
                        }
                        setOpenDetailsDialog(open);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem.id)}
                          disabled={isLoading}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        {orderDetails && (
                          <ShoppingOrderDetail orderDetails={orderDetails} />
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
