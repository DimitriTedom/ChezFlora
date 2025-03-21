import { GiNewBorn } from "react-icons/gi"; 
import { MdEmojiEvents } from "react-icons/md"; 
import { BiCategoryAlt } from "react-icons/bi"; 
import { AiOutlineStock } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchProductDetails } from "@/store/shop/ShopProductSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ChezFloraGallery, { ChezFloraGalleryProps } from "@/components/Shopping-view/ChezFloraGallery";

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
  reviews?: {
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}



const ShoppingProductDetail = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const productId = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

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
        ]
      };

  return (
    <div className="flex flex-col gap-8 p-4 mt-24">
      {/* Product Images */}
      <div className="w-full">
            <ChezFloraGallery images={myImages.images}/>

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
              <Button variant="ghost" size="sm">
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
            <h1 className="text-2xl font-bold mb-3">{productDetails?.name}</h1>
          <Separator />
          <div className="flex gap-4 mt-4 flex-wrap">
            <Badge className="flex items-center gap-2">
              <AiOutlineStock className="w-4 h-4 xl:w-6 xl:h-6"/>
              {productDetails?.stock}
            </Badge>
            <Badge className="flex items-center gap-2">
             <BiCategoryAlt className="w-4 h-4 xl:w-6 xl:h-6"/>
              {productDetails?.category}
            </Badge>{" "}
            <Badge className="flex items-center gap-2 p-2">
              <MdEmojiEvents className="w-4 h-4 xl:w-6 xl:h-6"/>
              {productDetails?.event}
            </Badge>
            <Badge className="flex items-center gap-2 p-2">
              <GiNewBorn className="w-4 h-4 xl:w-6 xl:h-6"/>
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
          <Separator/>
          <CardDescription className="mt-4">
            {productDetails?.description}
          </CardDescription>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
            Reviews ({productDetails?.reviews?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Review input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Share your thoughts ..."
              className="w-full border p-2 rounded focus:outline-none focus:border-primary"
            />
            <Button variant="secondary" className="absolute right-2 top-2">
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Reviews list */}
          {productDetails?.reviews?.map((review, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="https://source.unsplash.com/random/80x80/?person"
                      alt="User Avatar"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{review.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <div>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`${
                        i < review.rating ? "text-yellow-400" : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-2">{review.comment}</p>
            </div>
          ))}

          {/* View more reviews */}
          {/* {productDetails?.reviews.length > 3 && (
            <Button variant="outline" className="mt-4">
              View more {productDetails.reviews.length - 3} reviews
            </Button>
          )} */}
        </CardContent>
      </Card>
        
      </div>
      <Card className="lg:w-[20%] h-fit">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <p className="text-3xl font-bold">${productDetails?.saleprice}</p>
              <Badge className="bg-red-500 flex text-white px-2.5 py-1 gap-1 rounded-full">
                -{discountPercentage}% <span>PROMO</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4 border rounded-lg p-4 items-center">
              <MdProductionQuantityLimits className="w-6 h-6" />
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleQuantityChange(false)}
                  className="border rounded-full p-1"
                  size="icon"
                  variant="ghost"
                >
                  <AiOutlineMinus />
                </Button>
                <p>{quantity}</p>
                <Button
                  onClick={() => handleQuantityChange(true)}
                  className="border rounded-full p-1 bg-white"
                  size="icon"
                >
                  <AiOutlinePlus />
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center mt-4">
              <p>Total</p>
              <p>$23.24</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button  onClick={handleAddToCart} className="mt-4 w-full p-6 font-semibold text-white bg-pink-300 hover:bg-pink-400 rounded-full text-[1.3rem]">
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
        </div>

    </div>
  );
};

export default ShoppingProductDetail;
