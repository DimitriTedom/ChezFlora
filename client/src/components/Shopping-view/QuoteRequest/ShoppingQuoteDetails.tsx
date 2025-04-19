import { Clock, Calendar, MessageSquare, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { QuoteRequest } from "@/store/shop/QuoteRequestSlice";
import { DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  quoteRequestDetails: QuoteRequest;
}

const ShoppingQuoteDetails = ({ quoteRequestDetails }: Props) => {
  if (!quoteRequestDetails) return null;

  return (
    <DialogContent className="max-w-[800px] p-8 rounded-lg shadow-xl">
      <div className="grid gap-8">
        {/* Quote Header */}
        <div className="space-y-2">
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
              <p className="text-sm">
                Type: {quoteRequestDetails.eventType}
              </p>
              <p className="text-sm">
                Date: {formatDate(quoteRequestDetails.eventDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Quote Description */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Request Details
          </h3>
          <div className="bg-accent/30 p-4 rounded-lg border">
            <p className="whitespace-pre-line">{quoteRequestDetails.description}</p>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid">

          {/* Timeline */}
          <div className="space-y-4">
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
          <div className="space-y-4">
            <h3 className="font-medium text-lg">
              {quoteRequestDetails.status === "APPROVED" 
                ? "Approval Details" 
                : "Rejection Reason"}
            </h3>
            <div className={`p-4 rounded-lg border ${
              quoteRequestDetails.status === "APPROVED"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}>
              {quoteRequestDetails.adminResponse ? (
                <p>{quoteRequestDetails.adminResponse}</p>
              ) : (
                <p className="text-muted-foreground">
                  No {quoteRequestDetails.status === "APPROVED" 
                    ? "approval" 
                    : "rejection"} details provided
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default ShoppingQuoteDetails;