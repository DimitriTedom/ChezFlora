import ProductFilter from "@/components/Shopping-view/Filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/ShopProductSlice";
import { AppDispatch, RootState } from "@/store/store";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import UserProductCard, { Product } from "./Carts/ProductCart";
import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import { useSearchParams } from "react-router-dom";

// interface SortOption {
//   id: string;
//   label: string;
// }
interface Filters{
  [key:string]: string[];
}
// type SortOptionsMap = {
//   [key: string]: SortOption[];
// };
const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(','))}`);
    }
  }
  console.log(queryParams)
  return queryParams.join('&');
};

const ShoppingStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, productList } = useSelector(
    (state: RootState) => state.shopProducts
  );
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSort = (value: string) => {
    setSort(value);
  };
  // getSectionId represents the category and getCurrentOption, the id of the chosen box
  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilters = { ...filters };
    // Checking whether the category of is present or not
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
    console.log(copyFilters);
    // console.log(getSectionId, searchParams, getCurrentOption);
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    const savedFilters = JSON.parse(sessionStorage.getItem("filters") || "{}");
    setFilters(savedFilters);
  }, []);
  useEffect(() => {
    sessionStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  // useEffect(() => {
  //   if (filters && Object.keys(filters).length > 0) {
  //     const createQueryString = createSearchParamsHelper(filters);
  //     setSearchParams(new URLSearchParams(createQueryString));
  //   }
  // }, [filters]);
  //fetching of products
  useEffect(() => {
    if(filters !== null && sort !== null)
    dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}));

  }, [dispatch,sort,filters]);
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

      <div className="mt-24 flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        <div className="xl:w-[20%]">
          <ProductFilter filters={filters} handleFilter={handleFilter} />
        </div>

        <div className="bg w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg xl:text-3xl font-semibold ">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {productList.length} Products
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    onValueChange={handleSort}
                    value={sort}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {isLoading ? (
            <ChezFloraLoader />
          ) : productList.length === 0 ? (
            <div className="flex justify-center items-center h-[300px]">
              <span className="text-3xl font-bold">No Product yet</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-8 px-4">
              {productList.map((product: Product) => (
                <UserProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingStore;
