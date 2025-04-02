import React, { useState } from "react";
import CommonForm from "../Common/Form";
import { Card, CardContent, CardHeader } from "../ui/card";
import { QuoteRequestformControls } from "@/config";

const QuoteRequestForm = () => {
  // Define the form controls based on the image


  // Initialize formData with default values
  const [formData, setFormData] = useState<Record<string, string>>({
    eventType: "",
    estimatedBudget: "",
    eventDate: "",
    description: "",
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your submission logic here
  };

  return (
    <Card className="bg-white rounded-2xl shadow-md p-6">
      <CardHeader className="text-2xl xl:text-3xl font-bold text-center">Request a quote?</CardHeader>
      <CardContent>
      <CommonForm
        formControls={QuoteRequestformControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText="Submit"
        isBnDisabled={false}
      />
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;