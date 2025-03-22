import { GiNewBorn } from "react-icons/gi";
import { MdEmojiEvents } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRightIcon,
  CalendarIcon,
  HeartIcon,
  Share2Icon,
  Star,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProductDetails } from "@/store/shop/ShopProductSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ChezFloraGallery, {
  ChezFloraGalleryProps,
} from "@/components/Shopping-view/ChezFloraGallery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  user: string;
  rating: number;
  content: string;
  createdAt: string;
}
interface ProductDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  saleprice: number;
  image: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  event: string;
  category: string;
  reviews?: Review[];
}

const ShoppingProductDetail = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const productId = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.shopProducts);
  const [reviewText, setReviewText] = useState("");
  const { showToast } = useCustomToast();
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        if (productId) {
          dispatch(fetchProductDetails(productId.id))
            .unwrap()
            .then((data) => {
              setProductDetails(data.data);
            });
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetail();
  }, []);

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity((prev) => prev + 1);
    } else if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Add logic to add product to cart
    console.log("Adding to cart:", productDetails, quantity);
  };
  const handleReviewSubmit = () => {
    // Add logic to submit the review
    console.log("Submitting review:", reviewText);
    setReviewText(""); // Clear the input field after submission
  };

  console.log(productDetails);
  const discountPercentage = productDetails?.saleprice
    ? Math.round(
        ((productDetails?.price - productDetails?.saleprice) /
          productDetails?.price) *
          100
      )
    : null;
  const myImages: ChezFloraGalleryProps = {
    images: [
      `${productDetails?.image}`,
      `/flowerGen5.jpg`,
      `/flower1.jpg`,
      `/flower12.webp`,
    ],
  };
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast({
        message: "Link copied!",
        subtitle: `${productDetails?.name} URL copied to clipboard`,
        type: "success",
      });
    } catch (error) {
      showToast({
        message: "Error",
        subtitle: "Failed to copy link",
        type: "error",
      });
    }
  };
  const totalPrice = useMemo(() => {
    if (!productDetails) return 0;
    const basePrice = productDetails.saleprice || productDetails.price;
    return (basePrice * quantity).toFixed(2);
  }, [quantity, productDetails]);

  if (isLoading) {
    return (
      <div>
        <ChezFloraLoader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8 p-4 mt-24">
      {/* Product Images */}
      <div className="w-full">
        <ChezFloraGallery images={myImages.images} />

        {/* Show all photos button */}
      </div>
      <div className="lg:flex-row flex flex-col gap-8 w-full justify-between">
        <div className="lg:w-[75%]  flex flex-col gap-8">
          {/* Product Details */}

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <Badge className="bg-red-500 flex text-white px-2.5 py-1 gap-1 rounded-full">
                  -{discountPercentage}% <span>PROMO</span>
                </Badge>

                <div className="flex">
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2Icon className="mr-2 h-4 w-4" />{" "}
                    <span className="hidden md:block">Share</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <HeartIcon className="mr-2 h-4 w-4" />
                    <span className="hidden md:block">Save</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold mb-3">
                {productDetails?.name}
              </h1>
              <div className="flex items-center space-x-3 px-3 py-2">
                <Avatar className="h-12 w-12 xl:h-14 xl:w-14 border-2 border-primary">
                  <AvatarImage
                    src={user?.image || "/avatar2.svg"}
                    alt="user avatar"
                  />
                  <AvatarFallback className="bg-primary text-white font-bold">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.role}</p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-4 mt-4 flex-wrap">
                <Badge className="flex items-center gap-2">
                  <AiOutlineStock className="w-4 h-4 xl:w-6 xl:h-6" />
                  {productDetails?.stock}
                </Badge>
                <Badge className="flex items-center gap-2">
                  <BiCategoryAlt className="w-4 h-4 xl:w-6 xl:h-6" />
                  {productDetails?.category}
                </Badge>{" "}
                <Badge className="flex items-center gap-2 p-2">
                  <MdEmojiEvents className="w-4 h-4 xl:w-6 xl:h-6" />
                  {productDetails?.event}
                </Badge>
                <Badge className="flex items-center gap-2 p-2">
                  <GiNewBorn className="w-4 h-4 xl:w-6 xl:h-6" />
                  {productDetails?.createdAt}
                </Badge>
              </div>
            </CardContent>
          </Card>
          {/* Description */}
          <Card className="mt-8 md:mt-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator />
              <CardDescription className="mt-4">
                {productDetails?.description}
              </CardDescription>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card className="w-full lg:w-[75%]">
            <CardHeader>
              <CardTitle>
                Reviews ({productDetails?.reviews?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enhanced review input with textarea */}
              <div className="relative">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="pr-12 border rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                  rows={5}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full hover:bg-primary/90"
                  onClick={handleReviewSubmit}
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {productDetails?.reviews?.map((review, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={review.userImage || "/avatar3.svg"}
                          />
                          <AvatarFallback>{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <p className="text-xs text-muted-foreground">
                            {/* {formatDate(review?.createdAt)} */}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            filled={i < review.rating}
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className=" w-full lg:w-[20%] lg:flex lg:flex-col lg:justify-start">
          <Card className="h-fit lg:shadow-lg lg:transition-all">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <p className="text-3xl font-bold">
                  ${productDetails?.saleprice}
                </p>
                <Badge className="bg-red-500 flex text-white px-2.5 py-1 gap-1 rounded-full">
                  -{discountPercentage}% <span>PROMO</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Quantity selector with stock limit */}
              <div className="flex justify-between mb-4 border rounded-lg p-4 items-center">
                <MdProductionQuantityLimits className="w-6 h-6" />
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}
                    size="icon"
                    variant="ghost"
                  >
                    <AiOutlineMinus className="h-4 w-4" />
                  </Button>
                  <p>{quantity}</p>
                  <Button
                    onClick={() => handleQuantityChange(true)}
                    disabled={
                      productDetails && quantity >= productDetails.stock
                    }
                    size="icon"
                    variant={
                      quantity >= (productDetails?.stock || Infinity)
                        ? "secondary"
                        : "default"
                    }
                  >
                    <AiOutlinePlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center mt-4">
                <p>Total</p>
                <p className="text-xl font-semibold">${totalPrice}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                onClick={handleAddToCart}
                disabled={quantity > (productDetails?.stock || 0)}
                className="mt-4 w-full p-6 font-semibold text-white bg-pink-300 hover:bg-pink-400 rounded-full text-[1.3rem]"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShoppingProductDetail;
