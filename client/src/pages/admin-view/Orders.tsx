import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import AdminOrderDetail from "@/components/Admin-view/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  getAllOrdersofAllUsers,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/OrderSlice";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/store/shop/OrderSlice";
import FormTitle from "@/components/Common/FormTitle";
import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import { Helmet } from "react-helmet-async";

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
  const { orderList, orderDetails, isLoading } = useSelector(
    (state: RootState) => state.adminOrder
  );
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleFetchOrderDetails = async (getId: string) => {
    await dispatch(getOrderDetailsForAdmin(getId));

    setSelectedOrderId(getId);

    setOpenDetailsDialog(true);
  };

  useEffect(() => {
    dispatch(getAllOrdersofAllUsers());
  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
    setSelectedOrderId(null);
  };
  return (
    <>
      <FormTitle
        title="All Orders"
        comment="As an admin, you have the ability to view and manage all orders"
        snowStyle="mb-16"
      />
      <Card>
        <Helmet>
          <title>Order Management | ChezFlora Admin</title>
          <meta
            name="description"
            content="View and process customer orders, update delivery statuses, and handle cancellations."
          />
          <meta
            property="og:title"
            content="Order Management | ChezFlora Admin"
          />
          <meta
            property="og:description"
            content="Track and manage customer orders for ChezFlora."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://www.chezflora.com/admin/orders"
          />
          <meta
            property="og:image"
            content="https://www.chezflora.com/images/admin-orders-preview.jpg"
          />
        </Helmet>
        <CardHeader>
          <CardTitle className="flex items-start"></CardTitle>
        </CardHeader>
        {isLoading ? (
          <ChezFloraLoader />
        ) : orderList.length === 0 ? (
          <div className="flex justify-center items-center h-[300px]">
            <span className="text-3xl font-bold">No Orders for the moment</span>
          </div>
        ) : (
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
              <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
                <DialogContent className="overflow-y-auto">
                  {orderDetails &&
                  selectedOrderId &&
                  orderDetails.id === selectedOrderId ? (
                    <AdminOrderDetail orderDetails={orderDetails} />
                  ) : (
                    <p>Loading...</p>
                  )}
                </DialogContent>
              </Dialog>
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
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem.id)}
                          disabled={isLoading}
                        >
                          View Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default AdminOrders;
