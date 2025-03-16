import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface FormControlItem {
  name: string;
  label: string;
  placeholder: string;
  component: "input" | "textarea" | "select";
  type?: "email" | "text" | "password" ; // Facultatif pour le composant input
}

export interface CommonFormProps {
  formControls: FormControlItem[];
  formData: Record<string, string>;
  setFormData: (formData: Record<string, string>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClick?: (e:React.MouseEvent) => void;
  buttonText?: string; // Facultatif avec une valeur par défaut
  isBnDisabled?:boolean;
}

const CommonForm: React.FC<CommonFormProps> = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  isBnDisabled,
  buttonText,
}) => {
  const renderInputByComponentType = (controlItem: FormControlItem) => {
    const value = formData[controlItem.name] || "";
    switch (controlItem.component) {
      case "input":
        return (
          <Input
            type={controlItem.type || "text"}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) => setFormData({ ...formData, [controlItem.name]: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, [controlItem.name]: e.target.value })}
            className="mt-1 w-full"
            rows={4}
          />
        );
      default:
        return (
          <Input
            type={controlItem.type || "text"}
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            onChange={(e) => setFormData({ ...formData, [controlItem.name]: e.target.value })}
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
            <Label htmlFor={controlItem.name} className="text-[1.2rem] text-gray-500 mb-2 w-full flex">
              {controlItem.label}
            </Label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button type="submit" disabled={isBnDisabled} className="mt-4 w-full p-6 font-semibold text-white bg-pink-300 hover:bg-pink-400 rounded-full text-[1.3rem]">
      {isBnDisabled ? "Loading..." : buttonText}
      </Button>
      
    </form>
  );
};

export default CommonForm;