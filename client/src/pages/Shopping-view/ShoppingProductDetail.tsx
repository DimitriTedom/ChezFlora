"use client";

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
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Share2Icon, HeartIcon, ArrowRightIcon, Star } from "lucide-react";
import { useParams, Link } from "react-router-dom";
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

interface Review {
  user: string; // id of user
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
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [reviewText, setReviewText] = useState<string>("");
  const { id: prodId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.shoppingCart);
  const { isLoading } = useSelector((state: RootState) => state.shopProducts);
  const { showToast } = useCustomToast();

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
            .catch((error) => console.error("Error fetching product details:", error));
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
        ((productDetails.price - productDetails.saleprice) / productDetails.price) * 100
      )
    : null;

  // Define gallery images for product
  const myImages: ChezFloraGalleryProps = {
    images: productDetails?.image
      ? [productDetails.image, "/flowerGen5.jpg", "/flower1.jpg", "/flower12.webp"]
      : ["/flowerGen5.jpg", "/flower1.jpg", "/flower12.webp"],
  };

  // Handle quantity changes for product selection
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
  ? (
      (cartItems as Cart).items && Array.isArray((cartItems as Cart).items)
        ? (cartItems as Cart).items.find((item: CartItem) => item.productId === productDetails?.id)?.quantity || 0
        : 0
    )
  : 0;

  // Check if adding more would exceed available stock
  const canAddToCart: boolean =
    productDetails !== null &&
    quantity + currentCartQty <= productDetails.stock;

  // "Add to Cart" button appears only when the product is not yet in the cart.
  const showAddToCartButton: boolean = currentCartQty === 0;

  // Add product to cart handler
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
      const data = await dispatch(addToCart({ userId: user?.id!, productId: id, quantity })).unwrap();
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
    console.log("Submitting review:", reviewText);
    setReviewText("");
  };

  // Calculate total price for the selected quantity
  const totalPrice = productDetails
    ? ( (productDetails.saleprice || productDetails.price) * quantity ).toFixed(2)
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

  // If loading or no product details yet, show loader or message
  if (isLoading) {
    return <ChezFloraLoader />;
  }
  if (!productDetails) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  return (
    <div className="flex flex-col gap-8 p-4 mt-24">
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
              <div className="flex items-center space-x-3 px-3 py-2">
                <Avatar className="h-12 w-12 xl:h-14 xl:w-14 border-2 border-primary">
                  <AvatarImage src={user?.image || "/avatar2.svg"} alt="user avatar" />
                  <AvatarFallback className="bg-primary text-white font-bold">
                    {user?.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.role}</p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-4 mt-4 flex-wrap">
                <Badge className="flex items-center gap-2">
                  <span className="text-sm">Stock: {productDetails.stock}</span>
                </Badge>
                <Badge className="flex items-center gap-2">
                  <span className="text-sm">{productDetails.category}</span>
                </Badge>
                <Badge className="flex items-center gap-2 p-2">
                  <span className="text-sm">{productDetails.event}</span>
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
          <Card className="w-full lg:w-[75%]">
            <CardHeader>
              <CardTitle>
                Reviews ({productDetails.reviews?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {productDetails.reviews?.map((review, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.userImage || "/avatar3.svg"} />
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
                            className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
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
                  <Button onClick={() => handleQuantityChange(false)} disabled={quantity <= 1} size="icon" variant="ghost">
                    <AiOutlineMinus className="h-4 w-4" />
                  </Button>
                  <p>{quantity}</p>
                  <Button onClick={() => handleQuantityChange(true)} disabled={productDetails && quantity + currentCartQty >= productDetails.stock} size="icon" variant={quantity + currentCartQty >= (productDetails?.stock || Infinity) ? "secondary" : "default"}>
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
              {showAddToCartButton && (
                <Button onClick={() => handleAddToCart(productDetails.id)} disabled={!canAddToCart} className="mt-4 w-full p-6 font-semibold text-white bg-pink-300 hover:bg-pink-400 rounded-full text-[1.3rem]">
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
