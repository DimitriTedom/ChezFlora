import { AiOutlineEye } from "react-icons/ai"; 
import { AiOutlineEyeInvisible } from "react-icons/ai"; 
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { StatusFormData } from "../Admin-view/AdminQuoteDetails";
import { ProductFormData } from "@/pages/admin-view/Products";

export interface FormControlItem {
  name: string;
  label: string;
  placeholder: string;
  component: "input" | "textarea" | "select";
  type?: "email" | "text" | "password" | "date" | "number" | "tel"; // Added date type
  options?: { id: string; label: string }[];
}

export interface CommonFormProps {
  formControls: FormControlItem[];
  formData: StatusFormData | { email: string; password: string; } | ProductFormData | {status:string};
  setFormData: (formData: StatusFormData) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClick?: (e: React.MouseEvent) => void;
  buttonText?: string;
  isBnDisabled?: boolean;
}

const CommonForm: React.FC<CommonFormProps> = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  isBnDisabled,
  buttonText,
}) => {
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const renderInputByComponentType = (controlItem: FormControlItem) => {
    const value = formData[controlItem.name] || "";

    // Handle password visibility toggle
    if (controlItem.component === "input" && controlItem.type === "password") {
      return (
        <div className="relative">
          <Input
            type={showPassword[controlItem.name] ? "text" : "password"}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              })
            }
            className="p-6 border-solid border rounded-full w-full border-[#e5e7eb] shadow-sm lg:text-xl pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3"
            onClick={() => togglePasswordVisibility(controlItem.name)}
          >
            {showPassword[controlItem.name] ? (
              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
            ) : (
              <AiOutlineEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      );
    }

    switch (controlItem.component) {
      case "input":
        return (
          <Input
            type={controlItem.type || "text"} 
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              })
            }
            className="p-6 border-solid border rounded-full w-full border-[#e5e7eb] shadow-sm lg:text-xl"
          />
        );

      case "textarea":
        return (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              })
            }
            className="border-solid border rounded-md border-[#e5e7eb] shadow-sm lg:text-xl w-full"
            rows={4}
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
            value={value as string}
          >
            <SelectTrigger className="w-full p-6 border-solid border rounded-full border-[#e5e7eb] shadow-sm lg:text-xl">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options?.map((optionItem) => (
                <SelectItem
                  key={optionItem.id}
                  value={optionItem.id}
                >
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            type={controlItem.type || "text"}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [controlItem.name]: e.target.value,
              })
            }
            className="p-6 border-solid border rounded-full w-full border-[#e5e7eb] shadow-sm lg:text-xl"
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label
              htmlFor={controlItem.name}
              className="text-[1.2rem] text-gray-500 mb-2 w-full flex"
            >
              {controlItem.label}
            </Label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        disabled={isBnDisabled}
        className="mt-4 w-full p-6 font-semibold text-white bg-pink-300 hover:bg-pink-400 rounded-full text-[1.3rem]"
      >
        {isBnDisabled ? "waiting form Data..." : buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;