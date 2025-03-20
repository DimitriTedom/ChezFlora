import ProductFilter from "@/components/Shopping-view/Filter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";

// interface SortOption {
//   id: string;
//   label: string;
// }

// type SortOptionsMap = {
//   [key: string]: SortOption[];
// };

const ShoppingStore = () => {
  return (
    <div>
      <Helmet>
        <title>Find a Store - ChezFlora Locations</title>
        <meta
          name="description"
          content="Visit our physical store or schedule a consultation for custom floral design. Open Monday-Saturday. Free in-store pickup available."
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content="ChezFlora Store Locator" />
        <meta
          property="og:description"
          content="Discover our boutique locations and schedule an in-person consultation for your event or home décor needs."
        />
        <meta property="og:image" content="/assets/og-store.jpg" />{" "}
        {/* Store exterior photo */}
      </Helmet>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter />

        <div className="bg w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold ">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">10 Products</span>
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4"/>
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px">
                <DropdownMenuRadioGroup>
                  {
                    sortOptions.map(sortItem=> <DropdownMenuRadioItem key={sortItem.id}>
                        {sortItem.label}
                    </DropdownMenuRadioItem>
                    )
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 xl:grid-cols-4 gap-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingStore;
