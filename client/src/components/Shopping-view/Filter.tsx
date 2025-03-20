import React, { Fragment, useState, ChangeEvent } from "react";
import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

// Define the type for a filter option
interface FilterOption {
  id: string;
  label: string;
}

type FilterOptionsMap = {
  [key: string]: FilterOption[];
};

const filters: FilterOptionsMap = filterOptions;

const ProductFilter: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [category: string]: string[]; 
  }>({});

  // Handler for checkbox changes
  const handleCheckboxChange = (
    category: string,
    optionId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFilters((prev) => {
      const currentSelections = prev[category] || [];
      if (e.target.checked) {
        // Add this option to the selections for the category
        return { ...prev, [category]: [...currentSelections, optionId] };
      } else {
        // Remove this option from the selections for the category
        return {
          ...prev,
          [category]: currentSelections.filter((id) => id !== optionId),
        };
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filters).map((category) => (
          <Fragment key={category}>
            <div>
              <h3 className="text-base font-bold">{category}</h3>
              <div className="grid gap-2 mt-2">
                {filters[category].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Checkbox
                      onChange={(e) =>
                        handleCheckboxChange(category, option.id, e)
                      }
                      checked={
                        selectedFilters[category]
                          ? selectedFilters[category].includes(option.id)
                          : false
                      }
                    />
                    <span>{option.label}</span>
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
