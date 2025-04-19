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
import {
  fetchAllFilteredProducts,
} from "@/store/shop/ShopProductSlice";
import { AppDispatch, RootState } from "@/store/store";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import UserProductCard, { Product } from "./Carts/ProductCart";
import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import { useNavigate, useSearchParams } from "react-router-dom";
import QuoteRequestForm from "@/components/Shopping-view/QuoteRequestForm";
import FormTitle from "@/components/Common/FormTitle";
import EventCarousel from "@/components/Shopping-view/ProductImageCarousel";


export interface Filters {
  [key: string]: string[];
}

const createSearchParamsHelper = (filterParams: Filters): string => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
    }
  }
  return queryParams.join("&");
};

const ShoppingStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, productList } = useSelector(
    (state: RootState) => state.shopProducts
  );
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<string>("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const savedFilters = JSON.parse(sessionStorage.getItem("filters") || "{}");
    setFilters(savedFilters);
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(queryString);
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (filters && sort) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, filters, sort]);

  const handleSort = (value: string) => {
    setSort(value);
  };

  const handleFilter = (sectionId: string, optionId: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const section = newFilters[sectionId] || [];
      const index = section.indexOf(optionId);

      if (index === -1) {
        newFilters[sectionId] = [...section, optionId];
      } else {
        newFilters[sectionId] = section.filter((item) => item !== optionId);
      }

      if (newFilters[sectionId].length === 0) {
        delete newFilters[sectionId];
      }

      sessionStorage.setItem("filters", JSON.stringify(newFilters));
      return newFilters;
    });
  };

  const handleGetProductDetails = (productId: string) => {
    navigate(`/shop/detail/${productId}`);
    console.log(searchParams)
  };

  // console.log("Cart items from store:", cartItems, Array.isArray(cartItems));

  return (
    <div>
      <Helmet>
        <title>Find a Store - ChezFlora Locations</title>
        <meta
          name="description"
          content="Visit our physical store or schedule a consultation for custom floral design. Open Monday-Saturday. Free in-store pickup available."
        />
        <meta property="og:title" content="ChezFlora Store Locator" />
        <meta
          property="og:description"
          content="Discover our boutique locations and schedule an in-person consultation for your event or home décor needs."
        />
        <meta property="og:image" content="/assets/og-store.jpg" />
      </Helmet>

      <div className="mt-24 flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        <div className="xl:w-[20%]">
          <ProductFilter filters={filters} handleFilter={handleFilter} />
        </div>

        <div className="w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg xl:text-3xl font-semibold">All Products</h2>
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
                    {sortOptions.map((option) => (
                      <DropdownMenuRadioItem key={option.id} value={option.id}>
                        {option.label}
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
              <span className="text-3xl font-bold">No Products Found</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-8 px-4">
              {productList.map((product: Product) => (
                <UserProductCard
                  key={product.id}
                  product={product}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* REQUEST YOUR PERSONALIZE QUOTE */}

      <section className="flex flex-col items-center gap-8 mt-[4rem] bg-rose-100 p-[3rem] rounded-3xl relative overflow-hidden">
        <div>
          <FormTitle
            title="Request your personalized quote"
            comment="Some of our decorations, what do you think about them ?"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center w-full">
          <div className="lg:w-[50%] h-full">
          {/* <ProductImageCarousel {...productData} /> */}
          <EventCarousel/>
          </div>
          <QuoteRequestForm />
        </div>
        {/* <img
          src="/ProduitEnVedeteFlower-removebg-preview.png"
          alt="motifFlower2"
          className="absolute scale-50 bottom-[-20%] left-[-50%] md:scale-75 opacity-80  xl:left-[-20%]"
        /> */}
      </section>
    </div>
  );
};

export default ShoppingStore;
