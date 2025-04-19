import { Fragment} from "react";
import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Filters } from "@/pages/Shopping-view/ShoppingStore";

// Define the type for a filter option
interface FilterOption {
  id: string;
  label: string;
}

type FilterOptionsMap = {
  [key: string]: FilterOption[];
};
 
const filtersOpt: FilterOptionsMap = filterOptions;

const ProductFilter = ({ filters, handleFilter }:{filters:Filters,handleFilter:(sectionId: string, optionId: string) => void}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filtersOpt) .map((KeyItem) => (
          <Fragment key={KeyItem}>
            <div>
              <h3 className="text-base font-bold">{KeyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filtersOpt[KeyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-normal cursor-pointer"
                  >
                    <Checkbox
                    checked={
                      filters && Object.keys(filters).length > 0 &&
                      filters[KeyItem] &&
                      filters[KeyItem].indexOf(option.id) > -1
                    }
                      onCheckedChange={() => handleFilter(KeyItem, option.id)}
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
