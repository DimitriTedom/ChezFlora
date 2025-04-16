import { Clock, Calendar, MessageSquare, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { QuoteRequest } from "@/store/shop/QuoteRequestSlice";
import { DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { FormEvent, useEffect, useState } from "react";
import { useCustomToast } from "@/hooks/useCustomToast";
import {
  getAllQuotesofAllUsers,
  getQuotesDetailsForAdmin,
  updateQuotesRequestStatus,
} from "@/store/admin/QuoteRequestSlice";
import CommonForm from "../Common/Form";
import { QuoteStatus } from "@/store/shop/QuoteRequestSlice";

interface Props {
  quoteRequestDetails: QuoteRequest;
}

export interface StatusFormData {
  status: QuoteStatus;
  adminResponse: string;
}

const AdminQuoteDetails = ({ quoteRequestDetails }: Props) => {
  const [formData, setFormData] = useState<StatusFormData>({
    status: quoteRequestDetails.status,
    adminResponse: quoteRequestDetails.adminResponse || "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const updateStatus = useSelector(
    (state: RootState) => state.adminQuoteRequest.status
  );
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useCustomToast();
  //   const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (updateStatus === "loading") {
      setIsUpdating(true);
    } else if (updateStatus === "failed") {
      setIsUpdating(false);
      showToast({
        message: "Failed to Update Quote Status",
        subtitle:
          "There was an error updating the quote status. Please try again.",
        type: "error",
      });
    } else if (updateStatus === "succeeded") {
      setIsUpdating(false);
    }
  }, [updateStatus, showToast]);

  if (!quoteRequestDetails) return null;

  const handleSubmitUpdateStatus = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        updateQuotesRequestStatus({
          id: quoteRequestDetails.id,
          status: formData.status,
          adminResponse: formData.adminResponse,
        })
      ).unwrap();

      showToast({
        message: "Quote status updated successfully",
        type: "success",
        duration: 3000,
      });

      // Refresh the quote details
      await dispatch(getQuotesDetailsForAdmin(quoteRequestDetails.id));
      await dispatch(getAllQuotesofAllUsers());
    } catch (error) {
      console.log(error)
      showToast({
        message: "Failed to update quote status",
        subtitle: "An unexpected error occurred while updating the quote.",
        type: "error",
        duration: 2000,
      });
      setIsUpdating(false);
    }
  };

  return (
    <DialogContent className="max-w-[95vw] md:max-w-[800px] lg:min-h-screen overflow-y-auto ">
      <div className="grid gap-3 p-4">
        {/* Quote Header */}
        <div className="space-y-2 sticky top-0 bg-background z-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Quote Request Details
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Quote #{quoteRequestDetails.id}</span>
            <span>•</span>
            <span>Created on {formatDate(quoteRequestDetails.createdAt)}</span>
          </div>
        </div>
        <div className="space-y-6 overflow-y-auto pb-4">
          {/* Status & Event Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-accent/30 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5" />
                <h3 className="font-medium">Quote Status</h3>
              </div>
              <Badge
                className={`text-sm py-1 px-3 ${
                  quoteRequestDetails.status === "PENDING"
                    ? "bg-yellow-300 hover:bg-yellow-400"
                    : quoteRequestDetails.status === "PROCESSING"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : quoteRequestDetails.status === "APPROVED"
                    ? "bg-teal-500 hover:bg-teal-600"
                    : quoteRequestDetails.status === "REJECTED"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-500 hover:bg-gray-600" // CANCELLED
                }`}
              >
                {quoteRequestDetails.status}
              </Badge>
            </div>

            <div className="bg-accent/30 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <h3 className="font-medium">Event Information</h3>
              </div>
              <div className="space-y-1">
                <p className="text-sm">Type: {quoteRequestDetails.eventType}</p>
                <p className="text-sm">
                  Date: {formatDate(quoteRequestDetails.eventDate)}
                </p>
                {quoteRequestDetails.estimatedBudget && (
                  <p className="text-sm">
                    Budget: ${quoteRequestDetails.estimatedBudget.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quote Description */}
          <div className="space-y-2">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Request Details
            </h3>
            <div className="bg-accent/30 p-4 rounded-lg border">
              <p className="whitespace-pre-line">
                {quoteRequestDetails.description}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid">
            {/* Timeline */}
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Timeline</h3>
              <div className="space-y-2 text-sm bg-accent/30 p-4 rounded-lg border">
                <div className="flex justify-between">
                  <span>Requested:</span>
                  <span>{formatDate(quoteRequestDetails.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>{formatDate(quoteRequestDetails.updatedAt)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Event Date:</span>
                  <span>{formatDate(quoteRequestDetails.eventDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Response Section (if approved/rejected) */}
          {(quoteRequestDetails.status === "APPROVED" ||
            quoteRequestDetails.status === "REJECTED") && (
            <div className="space-y-2">
              <h3 className="font-medium text-lg">
                {quoteRequestDetails.status === "APPROVED"
                  ? "Approval Details"
                  : "Rejection Reason"}
              </h3>
              <div
                className={`p-4 rounded-lg border ${
                  quoteRequestDetails.status === "APPROVED"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                {quoteRequestDetails.adminResponse ? (
                  <p>{quoteRequestDetails.adminResponse}</p>
                ) : (
                  <p className="text-muted-foreground">
                    No{" "}
                    {quoteRequestDetails.status === "APPROVED"
                      ? "approval"
                      : "rejection"}{" "}
                    details provided
                  </p>
                )}
              </div>
            </div>
          )}

          <Separator />

          {/* Status Update Form */}
          <div className="w-full">
            <h3 className="font-medium text-lg mb-4">Update Quote Status</h3>
            <CommonForm
              formControls={[
                {
                  label: "Status",
                  name: "status",
                  component: "select",
                  placeholder: "Select status",
                  options: [
                    { id: "PENDING", label: "Pending" },
                    { id: "PROCESSING", label: "Processing" },
                    { id: "APPROVED", label: "Approved" },
                    { id: "REJECTED", label: "Rejected" },
                    { id: "CANCELLED", label: "Cancelled" },
                  ],
                },
                {
                  label: "Admin Response",
                  name: "adminResponse",
                  component: "textarea",
                  placeholder: "Enter response to the user...",
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={isUpdating ? "Updating..." : "Update Status"}
              isBnDisabled={isUpdating}
              onSubmit={handleSubmitUpdateStatus}
            />
          </div>
        </div>/
      </div>
    </DialogContent>
  );
};

export default AdminQuoteDetails;
