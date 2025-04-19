import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import FormTitle from "@/components/Common/FormTitle";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getSearchResults,
  resetProductSearchResults,
} from "@/store/shop/SearchProductsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserProductCard, { Product } from "../Carts/ProductCart";
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
  const [productKeyword, setProductKeyword] = useState("");
  const [productSearchParams, setProductSearchParams] = useSearchParams();
  const { searchResults, isLoading } = useSelector(
    (state: RootState) => state.searchPrdouct
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      productKeyword &&
      productKeyword.trim() !== "" &&
      productKeyword.trim().length > 3
    ) {
      setTimeout(() => {
        setProductSearchParams(
          new URLSearchParams(`?keyword=${productKeyword}`)
        );
        dispatch(getSearchResults(productKeyword));
      }, 1000);
    } else {
      dispatch(resetProductSearchResults());
    }
  }, [productKeyword, productSearchParams]);

  const handleGetProductDetails = (productId: string) => {
    navigate(`/shop/detail/${productId}`);
  };

  return (
    <div className="mt-32">
      <Helmet>
        <title>Find Flowers & Blogs | ChezFlora</title>
        <meta
          name="description"
          content="Search for fresh flowers, plants, and floral décor at ChezFlora. Filter by category, price, or season."
        />
        <meta property="og:title" content="Find Flowers & Blogs | ChezFlora" />
        <meta
          property="og:description"
          content="Discover the perfect floral arrangements for any occasion at ChezFlora."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.chezflora.com/shop/search"
        />
        <meta
          property="og:image"
          content="https://www.chezflora.com/images/search-preview.jpg"
        />
      </Helmet>
      <div className="flex flex-col">
        <div className="mx-auto mt-8  w-full">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-md w-full">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="rounded-xl grid grid-cols-2">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="blogs">Blogs</TabsTrigger>
              </TabsList>
              <TabsContent value="products">
                <FormTitle
                  title="Products ?"
                  comment="Find your favorite products here"
                  snowStyle="items-start gap-1"
                />
                <div className="mt-5 relative">
                  <SearchIcon className="w-6 h-6 text-black absolute top-2 right-3" />
                  <Input
                    value={productKeyword}
                    className="rounded-full p-5 border-black"
                    placeholder="Search Products..."
                    onChange={(e) => setProductKeyword(e.target.value)}
                  />
                </div>

                {isLoading ? (
                  <ChezFloraLoader />
                ) : searchResults.length === 0 ? (
                  <div className="flex justify-center flex-col items-center h-[300px]">
                    <img
                      src="/NoProducts.svg"
                      alt="No Prouct"
                      className="w-[200px]"
                    />
                    <span className="text-3xl font-bold">No Results Found</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-8 px-4">
                    {searchResults.map((product: Product) => (
                      <UserProductCard
                        key={product.id}
                        product={product}
                        handleGetProductDetails={handleGetProductDetails}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="blogs">
                <FormTitle
                  title="Blogs ?"
                  comment="Find your favorite Blogs here"
                  snowStyle="items-start gap-1"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
