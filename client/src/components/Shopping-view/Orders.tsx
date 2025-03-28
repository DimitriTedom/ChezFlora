import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
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
import { getAllOrdersByUser, Order } from "@/store/shop/OrderSlice";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, orderList } = useSelector(
    (state: RootState) => state.shopOrder
  );
  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch, user]);
  console.log(orderList, "orderList");
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
                <TableRow>
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
                      onOpenChange={setOpenDetailsDialog}
                    >
                      <Button onClick={() => setOpenDetailsDialog(true)}>
                        View Details
                      </Button>
                      <ShoppingOrderDetail />
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
