import React, { useState } from "react";
import CommonForm from "../Common/Form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { QuoteRequestformControls } from "@/config";
import {
  createQuoteRequest,
  QuoteRequestFormData,
} from "@/store/shop/QuoteRequestSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useCustomToast } from "@/hooks/useCustomToast";
import { EventType } from "@/store/shop/QuoteRequestSlice"; // Import EventType from your slice

const QuoteRequestForm = () => {
  const [formData, setFormData] = useState<QuoteRequestFormData>({
    eventType: "",
    estimatedBudget: 0,
    eventDate: "",
    description: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector(
    (state: RootState) => state.shopQuoteRequest
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const validateFormData = (data: QuoteRequestFormData): boolean => {
    if (!data.eventType || !data.eventDate || !data.description) {
      return false;
    }

    // Validate event type is one of the enum values
    if (!Object.values(EventType).includes(data.eventType as EventType)) {
      return false;
    }

    // Validate event date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    const selectedDate = new Date(data.eventDate);
    if (selectedDate <= today) {
      return false;
    }

    if (data.description.trim().length < 10) {
      return false;
    }

    if (data.estimatedBudget && data.estimatedBudget < 0) {
      return false;
    }

    return true;
  };

  // Handle form submission
  const { showToast } = useCustomToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateFormData(formData)) {
      showToast({
        type: "error",
        message: "Please fill all required fields correctly",
        duration: 2000,
      });
      return;
    }

    try {
      dispatch(createQuoteRequest({ ...formData, userId: user?.id }))
        .unwrap()
        .then((data) => {
          if (data.success) {
            showToast({
              type: "success",
              message: data.message,
              duration: 2000,
            });
            // Reset form after successful submission
            setFormData({
              eventType: "",
              estimatedBudget: 0,
              eventDate: "",
              description: "",
            });
          }
        });
    } catch (error: any) {
      showToast({
        type: "error",
        message: error.message || "Failed to submit quote request",
        duration: 2000,
      });
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-md p-6">
      <CardHeader className="text-2xl xl:text-3xl font-bold text-center">
        Request a quote?
      </CardHeader>
      <CardContent>
        <CommonForm
          formControls={QuoteRequestformControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText={isLoading ? "Submitting..." : "Submit"}
          isBnDisabled={isLoading || !validateFormData(formData)}
        />
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;