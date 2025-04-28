import React, { useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import {
  getAllQuotesofAllUsers,
  getQuotesDetailsForAdmin,
  resetQuoteRequestDetails,
} from "@/store/admin/QuoteRequestSlice";
import { QuoteRequest } from "@/store/shop/QuoteRequestSlice";
import AdminQuoteDetails from "@/components/Admin-view/AdminQuoteDetails";
import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import FormTitle from "@/components/Common/FormTitle";

const AdminQuotes = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
  const [selectedQuoteId, setselectedQuoteId] = React.useState<string | null>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading, quoteRequestList, quoteRequestDetails } = useSelector(
    (state: RootState) => state.adminQuoteRequest
  );
  const handleFectchQuoteDetails = async (quoteId: string) => {
    await dispatch(getQuotesDetailsForAdmin(quoteId));
    setselectedQuoteId(quoteId);
    console.log(quoteId, "selectedQuoteId (before state updates)");
    setOpenDetailsDialog(true);
  };
  useEffect(() => {
    dispatch(getAllQuotesofAllUsers());
  }, [dispatch, user]);

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(resetQuoteRequestDetails());
    setselectedQuoteId(null);
  };
  if (isLoading) {
    return (
      <div>
        <ChezFloraLoader />
      </div>
    );
  }
  return (
    <>
      <FormTitle title="All Quotes Requests ❤️" comment="As, the Super admin, you have th right to update Request Status, and answer users" snowStyle="mb-16"/>
    <Card>
      <Helmet>
        <title>Quote Requests | ChezFlora Admin</title>
        <meta
          name="description"
          content="Review and respond to custom decoration quote requests for events and weddings."
        />
        <meta property="og:title" content="Quote Requests | ChezFlora Admin" />
        <meta
          property="og:description"
          content="Manage custom decoration quotes for ChezFlora clients."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/admin/quotes"
        />
        <meta
          property="og:image"
          content="https://www.chezflora.com/images/admin-quotes-preview.jpg"
        />
      </Helmet>
      
      
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
                  <AdminQuoteDetails
                    quoteRequestDetails={quoteRequestDetails}
                  />
                ) : (
                  <p><ChezFloraLoader/></p>
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
                    <TableCell>
                      {quoteRequest.createdAt.split("T")[0]}
                    </TableCell>
                    <TableCell>${quoteRequest.estimatedBudget}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          handleFectchQuoteDetails(quoteRequest.id)
                        }
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
    </>
  );
};

export default AdminQuotes;
