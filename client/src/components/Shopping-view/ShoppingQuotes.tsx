import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { fetchAllQuoteRequests, getQuoteRequestDetail, QuoteRequest, resetQuoteRequestDetails } from "@/store/shop/QuoteRequestSlice";
import ShoppingQuoteDetails from "./QuoteRequest/ShoppingQuoteDetails";

const ShoppingQuotes = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
  const [selectedQuoteId, setselectedQuoteId] = React.useState<string | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, quoteRequestList, quoteRequestDetails } = useSelector(
    (state: RootState) => state.shopQuoteRequest
  );
  const handleFectchQuoteDetails = async (quoteId: string) => {
    await dispatch(getQuoteRequestDetail(quoteId));
    setselectedQuoteId(quoteId);
    console.log(quoteId, "selectedQuoteId (before state updates)");
    setOpenDetailsDialog(true);
  };
  useEffect(() => {
    dispatch(fetchAllQuoteRequests(user!.id));
  }, [dispatch, user]);

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(resetQuoteRequestDetails());
    setselectedQuoteId(null);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote Request History</CardTitle>
      </CardHeader>
      <CardContent>
        {quoteRequestList && quoteRequestList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote Request ID</TableHead>
                <TableHead>Quote Request Status</TableHead>
                <TableHead>Quoute Request Date</TableHead>
                <TableHead>Quoute Request Estimated Budget</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
              <DialogContent>
                {quoteRequestDetails &&
                selectedQuoteId &&
                quoteRequestDetails.id === selectedQuoteId ? (
                  <ShoppingQuoteDetails quoteRequestDetails={quoteRequestDetails} />
                ) : (
                  <p>Loading...</p>
                )}
              </DialogContent>
            </Dialog>
            <TableBody>
              {quoteRequestList &&
                quoteRequestList.length > 0 &&
                quoteRequestList.map((quoteRequest: QuoteRequest) => (
                  <TableRow key={quoteRequest.id}>
                    <TableCell>#{quoteRequest.id}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-0 px-3 ${
                            quoteRequest.status === "PENDING"
                            ? "bg-yellow-300"
                            : quoteRequest.status === "PROCESSING"
                            ? "bg-blue-500"
                            : quoteRequest.status === "CANCELLED"
                            ? "bg-gray-500"
                            : quoteRequest.status === "APPROVED"
                            ? "bg-teal-500"
                            : quoteRequest.status === "REJECTED"
                            ? "bg-red-600"
                            : "bg-red-500"
                        }`}
                      >
                        {quoteRequest.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{quoteRequest.createdAt.split("T")[0]}</TableCell>
                    <TableCell>${quoteRequest.estimatedBudget}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleFectchQuoteDetails(quoteRequest.id)}
                        disabled={isLoading}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex justify-center flex-col items-center h-[300px] self-center">
          <img
            src="/OrderEmpty.svg"
            alt="OrderEmpty.svg"
            className="w-[200px]"
          />
          <p className="text-gray-500 text-2xl font-bold text-center">
            No Orders Found, Purchase a product first.
          </p>
        </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ShoppingQuotes;
