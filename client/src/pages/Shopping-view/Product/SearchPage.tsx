import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import FormTitle from "@/components/Common/FormTitle";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSearchResults, resetProductSearchResults } from "@/store/shop/SearchProductsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserProductCard, { Product } from "../Carts/ProductCart";
import { useCustomToast } from "@/hooks/useCustomToast";
import { fetchProductDetails } from "@/store/shop/ShopProductSlice";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";

const SearchPage = () => {
  const [productKeyword, setProductKeyword] = useState("");
  const [productSearchParams, setProductSearchParams] = useSearchParams();
  const { searchResults, isLoading } = useSelector(
    (state: RootState) => state.searchPrdouct
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { showToast } = useCustomToast();

  useEffect(() => {
    if (
      productKeyword &&
      productKeyword.trim() !== "" &&
      productKeyword.trim().length > 3
    ) {
      console.log("searching for product", productKeyword);
      setTimeout(() => {
        setProductSearchParams(
          new URLSearchParams(`?keyword=${productKeyword}`)
        );
        dispatch(getSearchResults(productKeyword));
      }, 1000);
    }else{
      dispatch(resetProductSearchResults())
    }
  }, [productKeyword]);

  const handleGetProductDetails = (productId: string) => {
    navigate(`/shop/detail/${productId}`);
  };
  const items = (
    useSelector((state: RootState) => state.shoppingCart.cartItems) as any
  )?.items;

  const handleAddToCart = async (productId: string) => {
    try {
      const prodResponse = await dispatch(
        fetchProductDetails(productId)
      ).unwrap();
      const fetchedProduct = prodResponse.data;

      if (!fetchedProduct) {
        showToast({
          message: "Failed to fetch product details",
          type: "error",
          duration: 5000,
        });
        return;
      }

      const found = items.find((item: any) => item.productId === productId);
      const currentQty: number = found ? found.quantity : 0;

      if (currentQty + 1 > fetchedProduct.stock) {
        showToast({
          message: "Cannot add more than available stock",
          type: "error",
          duration: 5000,
        });
        return;
      }

      const addResponse = await dispatch(
        addToCart({ userId: user?.id!, productId, quantity: 1 })
      ).unwrap();
      if (addResponse?.success) {
        console.log("before fetching items", addResponse);
        dispatch(fetchCartItems(user!.id));
        showToast({
          message: "Product added to cart",
          type: "success",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Add to Cart Error:", error);
      showToast({
        message: "An error occurred while adding to cart",
        type: "error",
        duration: 5000,
      });
    }
  };
  console.log(searchResults, "searchResultsProducts");
  return (
    <div className="mt-32">
      <div className="flex flex-col">
        {/* <div className="relative z-10 h-[400px] w-full  overflow-hidden rounded-2xl">
                <img
                  src="/account2.jpg"
                  alt="account"
                  className="w-full h-full object-cover object-center rounded-2xl bg-red-300"
                />
              </div> */}

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
                  <div className="flex justify-center items-center h-[300px]">
                    <span className="text-3xl font-bold">
                      No Results Found
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 py-8 px-4">
                    {searchResults.map((product: Product) => (
                      <UserProductCard
                        key={product.id}
                        product={product}
                        handleGetProductDetails={handleGetProductDetails}
                        handleAddToCart={handleAddToCart}
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
