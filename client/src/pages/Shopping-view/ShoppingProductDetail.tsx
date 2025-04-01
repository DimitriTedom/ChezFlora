import { GrValidate } from "react-icons/gr";
import { MdSystemUpdateAlt } from "react-icons/md";
import { MdEmojiEvents } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";
("use client");

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Share2Icon, HeartIcon, ArrowRightIcon, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProductDetails } from "@/store/shop/ShopProductSlice";
import ChezFloraGallery, {
  ChezFloraGalleryProps,
} from "@/components/Shopping-view/ChezFloraGallery";
import ChezFloraLoader from "@/components/Common/ChezFloraLoader";
import { useCustomToast } from "@/hooks/useCustomToast";
import { fetchCartItems, addToCart } from "@/store/shop/cartSlice";
import { MdProductionQuantityLimits } from "react-icons/md";
import StarRating from "@/components/Common/StarRating";
import {
  addProductReview,
  getProductReview,
} from "@/store/shop/ProductReviewSlice";
import { formatDate } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";

interface Review {
  user: string;
  rating: number;
  content: string;
  createdAt: string;
}
interface CartItem {
  productId: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
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

const ShoppingProductDetail: React.FC = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [reviewContent, setReviewContent] = useState<string>("");
  const { id: prodId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.shoppingCart);
  const { isLoading } = useSelector((state: RootState) => state.shopProducts);
  const { isLoading: isProductReviewLoading, productReviews } = useSelector(
    (state: RootState) => state.shopProductReview
  );

  const { showToast } = useCustomToast();
  const [rating, setRating] = useState<number>(0);
  // Fetch product details on mount
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        if (prodId) {
          dispatch(fetchProductDetails(prodId))
            .then((response) => {
              // Check if the payload contains data before setting state
              if (response.payload && response.payload.data) {
                setProductDetails(response.payload.data);
              } else {
                console.error("No product data returned");
              }
            })
            .catch((error) =>
              console.error("Error fetching product details:", error)
            );
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetail();
  }, [prodId, dispatch]);

  // Fetch cart items for current user
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  // Calculate discount percentage if applicable
  const discountPercentage = productDetails?.saleprice
    ? Math.round(
        ((productDetails.price - productDetails.saleprice) /
          productDetails.price) *
          100
      )
    : null;

  // Define gallery images for product
  const myImages: ChezFloraGalleryProps = {
    images: productDetails?.image
      ? [
          productDetails.image,
          "/flowerGen5.jpg",
          "/flower1.jpg",
          "/flower12.webp",
        ]
      : ["/flowerGen5.jpg", "/flower1.jpg", "/flower12.webp"],
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment && productDetails && quantity < productDetails.stock) {
      setQuantity((prev) => prev + 1);
    } else if (!increment && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Simplify the lookup of current cart quantity without useMemo.
  // This expression safely finds the product in the cart; if not found, defaults to 0.
  const currentCartQty: number = cartItems
    ? (cartItems as Cart).items && Array.isArray((cartItems as Cart).items)
      ? (cartItems as Cart).items.find(
          (item: CartItem) => item.productId === productDetails?.id
        )?.quantity || 0
      : 0
    : 0;

  // here i Check if adding more would exceed available stock
  const canAddToCart: boolean =
    productDetails !== null &&
    quantity + currentCartQty <= productDetails.stock;
  // "Add to Cart" button appears only when the product is not yet in the cart.
  const showAddToCartButton: boolean = currentCartQty === 0;

  const handleAddToCart = async (id: string) => {
    if (!canAddToCart) {
      showToast({
        message: "Cannot add more than available stock",
        type: "error",
        duration: 5000,
      });
      return;
    }
    try {
      const data = await dispatch(
        addToCart({ userId: user?.id!, productId: id, quantity })
      ).unwrap();
      if (data?.success) {
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

  const handleReviewSubmit = () => {
    dispatch(
      addProductReview({
        productId: productDetails?.id,
        userId: user?.id,
        content: reviewContent,
        rating: rating,
        userName: user?.name,
      })
    )
      .unwrap()
      .then((data) => {
        console.log(data);
        if (data.success) {
          showToast({
            message: data.message,
            type: "success",
            duration: 2000,
          });
          setRating(0);
          setReviewContent("");
          dispatch(getProductReview(productDetails.id));
        }
      })
      .catch((error) => {
        showToast({
          message: error.message,
          type: "error",
          duration: 2000,
        });
      });
    setReviewContent("");
    setRating(0);
  };
  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getProductReview(productDetails.id));
    }
  }, [productDetails, dispatch]);
  const handleRatingChange = (getRating: number) => {
    setRating(getRating);
  };

  const totalPrice = productDetails
    ? ((productDetails.saleprice || productDetails.price) * quantity).toFixed(2)
    : "0";

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
  const averageReview =
    productReviews && productReviews.length > 0
      ? productReviews.reduce((sum, review) => sum + review.rating, 0) /
        productReviews.length
      : 0;
  if (isLoading) {
    return <ChezFloraLoader />;
  }
  if (!productDetails) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  return (
    <div className="flex flex-col gap-8 p-4 mt-24 min-h-screen">
      <Helmet>
        <title>{productDetails.name} | ChezFlora</title>
        <meta
          name="description"
          content={`Discover ${productDetails.name} at ChezFlora: ${productDetails.description}. Perfect for ${productDetails.event}.`}
        />
        <meta
          property="og:title"
          content={`${productDetails.name} | ChezFlora`}
        />
        <meta
          property="og:description"
          content={`${productDetails.description} – Available now at ChezFlora.`}
        />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`https://www.chezflora.com/shop/detail/${productDetails.id}`}
        />
        <meta property="og:image" content={productDetails.image} />
        <meta
          property="og:price:amount"
          content={productDetails.price.toString()}
        />
        <meta property="og:price:currency" content="EUR" />
      </Helmet>
      {/* Product Images */}
      <div className="w-full">
        <ChezFloraGallery images={myImages.images} />
      </div>
      <div className="lg:flex-row flex flex-col gap-8 w-full justify-between">
        <div className="lg:w-[75%] flex flex-col gap-8">
          {/* Product Details Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <Badge className="bg-red-500 flex text-white px-2.5 py-1 gap-1 rounded-full">
                  -{discountPercentage}% <span>PROMO</span>
                </Badge>
                <div className="flex">
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2Icon className="mr-2 h-4 w-4" />
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
              <h1 className="text-2xl font-bold mb-3">{productDetails.name}</h1>
              <div className="flex items-center gap-1">
                {/* <Star className="fill-yellow-400 text-yellow-400"/> */}
                <StarRating rating={averageReview} />
                <h1>
                  {averageReview}({productReviews.length})
                </h1>
              </div>
              <div className="flex items-center space-x-3 px-3 py-2">
                <Avatar className="h-12 w-12 xl:h-14 xl:w-14 border-2 border-primary">
                  <AvatarImage
                    src={user?.image || "/SnowDev (1).png"}
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
                  <AiOutlineStock />
                  <span className="text-sm">{productDetails.stock}</span>
                </Badge>
                <Badge className="flex items-center gap-2">
                  <BiCategoryAlt />
                  <span className="text-sm">{productDetails.category}</span>
                </Badge>
                <Badge className="flex items-center gap-2 p-2">
                  <MdEmojiEvents />
                  <span className="text-sm">{productDetails.event}</span>
                </Badge>
                <Badge className="flex items-center gap-2 p-2">
                  <GrValidate />
                  <span className="text-sm">
                    {productDetails.createdAt.split("T")[0]}
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card className="mt-8 md:mt-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator />
              <CardDescription className="mt-4">
                {productDetails.description}
              </CardDescription>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card className="w-full lg:w-[90%] shadow-lg rounded-lg p-4">
            <CardHeader>
              <CardTitle className="space-y-4">
                <Label className="text-2xl font-bold text-gray-800">
                  Reviews ({productReviews.length || 0} reviews)
                </Label>
                <StarRating
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
                <Separator />
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Review Input Section */}
              <div className="relative">
                <Textarea
                  name="reviewContent"
                  placeholder="Share your thoughts...(You can oonly review products you've bought)"
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-pink-400 transition-all duration-200"
                  rows={5}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-2 right-2 bg-pink-500 p-2 hover:bg-pink-600 text-white rounded-full shadow-md transition-all duration-200"
                  onClick={handleReviewSubmit}
                  disabled={reviewContent.trim() === ""}
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
              </div>

              {/* Reviews Display */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto px-2">
                {productReviews.length > 0 ? (
                  productReviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-3 border-b pb-3 last:border-none"
                    >
                      <div className="flex flex-col lg:flex-row justify-between lg:items-center">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage
                              src={review.userImage || "/avatar3.svg"}
                            />
                            <AvatarFallback>
                              {review.userName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {review.userName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(review?.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              filled={i < review.rating}
                              className={`w-5 h-5 transition-all duration-200 ${
                                i < review.rating
                                  ? "text-pink-400 fill-pink-400"
                                  : "text-gray-300 fill-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 ml-4">
                        {review.content}
                      </p>
                      <Separator />
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 mt-4 text-xl">
                    No reviews yet. Be the first to share your thoughts!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Quantity Selector and Add to Cart */}
        <div className="w-full lg:w-[20%] lg:flex lg:flex-col lg:justify-start">
          <Card className="h-fit lg:shadow-lg lg:transition-all">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <p className="text-3xl font-bold">
                  $
                  {productDetails.saleprice
                    ? productDetails.saleprice
                    : productDetails.price}
                </p>
                <Badge className="bg-red-500 flex text-white px-2.5 py-1 gap-1 rounded-full">
                  -{discountPercentage || 0}% <span>PROMO</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Quantity Selector */}
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
                      productDetails &&
                      quantity + currentCartQty >= productDetails.stock
                    }
                    size="icon"
                    variant={
                      quantity + currentCartQty >=
                      (productDetails?.stock || Infinity)
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
              {/* Only display Add to Cart button if the product is not already in the cart */}
              {showAddToCartButton && productDetails.stock === 0 ? (
                <Button
                  disabled={!canAddToCart}
                  className="mt-4 w-full p-6 font-semibold text-white bg-pink-300 hover:bg-pink-400 rounded-full text-[1.3rem] opacity-60 cursor-not-allowed"
                >
                  Out of Stock
                </Button>
              ) : (
                <Button
                  onClick={() => handleAddToCart(productDetails.id)}
                  disabled={!canAddToCart}
                  className="mt-4 w-full p-6 font-semibold text-white bg-pink-300 hover:bg-pink-400 rounded-full text-[1.3rem]"
                >
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShoppingProductDetail;
