"use client";

import { CgOptions } from "react-icons/cg";
import React, { useEffect, useState } from "react";
import { NavLink, Link, useSearchParams, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Logo from "../Common/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvatarCustum from "../Common/Avatar.custom";
import SignInButton from "./SignOrContactButton";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "../ui/button";
import UserCartWrapper from "./CartWrapper";
import { fetchCartItems } from "@/store/shop/cartSlice";
import { BsSearch } from "react-icons/bs";
import FormTitle from "../Common/FormTitle";
import { SearchIcon } from "lucide-react";
import {
  getSearchResults,
  resetProductSearchResults,
} from "@/store/shop/SearchProductsSlice";
import ChezFloraLoader from "../Common/ChezFloraLoader";
import UserProductCard, {
  Product,
} from "@/pages/Shopping-view/Carts/ProductCart";

interface NavMenuLinkProps {
  url: string;
  text: string;
}

const NavMenuLink: React.FC<NavMenuLinkProps> = ({ url, text }) => (
  <NavigationMenuItem>
    <NavLink
      to={url}
      className={({ isActive }) =>
        `text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all duration-300 py-2 px-4 rounded-lg font-medium ${
          isActive ? "bg-pink-100 text-pink-600 shadow-sm" : ""
        }`
      }
    >
      {text}
    </NavLink>
  </NavigationMenuItem>
);

const ShoppingHeader: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [productKeyword, setProductKeyword] = useState("");
  const [productSearchParams, setProductSearchParams] = useSearchParams();
  const { searchResults, isLoading } = useSelector(
    (state: RootState) => state.searchPrdouct
  );
  const cart = useSelector(
    (state: RootState) => state.shoppingCart.cart
  );

  const [openCartSheet, setOpenCartSheet] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id && isAuthenticated) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id, isAuthenticated, cart]);
  useEffect(() => {
    if (
      productKeyword &&
      productKeyword.trim() !== "" &&
      productKeyword.trim().length > 3
    ) {
      setTimeout(() => {
        setProductSearchParams(
          new URLSearchParams(`?keyword:${productKeyword}`)
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
    <div className="w-screen lg:mb-32 bg-opacity-95 overflow-x-hidden">
      {/* Mobile Header */}
      <div className="w-full flex items-center justify-between fixed top-0 z-[50] transition-all duration-300 lg:hidden py-4 px-4 overflow-x-hidden glass-effect shadow-lg border-b border-pink-200">
        <div className="hidden md:block">
          <Logo />
        </div>
        <Sheet>
          <SheetTrigger className="flex justify-center w-full">
            <div className="flex items-center justify-between glass-effect rounded-full p-3 w-full md:w-[60%] shadow-lg border border-pink-200">
              <button className="mr-3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full p-2 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </button>
              <div className="flex flex-col w-full justify-center">
                <Input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search flowers..."
                  className="bg-transparent outline-none w-full text-gray-700 px-2 border-none shadow-none placeholder:text-gray-500"
                />
                <div className="ml-2 text-gray-400 text-xs md:block">
                  category • name • event
                </div>
              </div>
              <button className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-2 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
                <CgOptions className="w-5 h-5 text-white" />
              </button>
            </div>
          </SheetTrigger>
          <SheetContent side="top" className="h-screen overflow-y-auto flower-gradient">
            <div className="flex flex-col">
              <div className="mx-auto mt-8 w-full">
                <div className="flex flex-col rounded-2xl border bg-white bg-opacity-90 backdrop-blur-sm p-6 shadow-xl w-full border-pink-200">
                  <Tabs defaultValue="products" className="w-full">
                    <TabsList className="rounded-xl grid grid-cols-2 bg-pink-100">
                      <TabsTrigger value="products" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-pink-600">Products</TabsTrigger>
                      <TabsTrigger value="blogs" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-pink-600">Blogs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="products">
                      <FormTitle
                        title="Find Beautiful Flowers"
                        comment="Discover our amazing collection of fresh flowers"
                        snowStyle="items-start gap-1"
                      />
                      <div className="mt-5 relative">
                        <SearchIcon className="w-6 h-6 text-pink-500 absolute top-3 right-4" />
                        <Input
                          value={productKeyword}
                          className="rounded-xl p-4 border-pink-200 focus:border-pink-400 focus:ring-pink-300 bg-white"
                          placeholder="Search beautiful flowers..."
                          onChange={(e) => setProductKeyword(e.target.value)}
                        />
                      </div>
                      {isLoading ? (
                        <div className="flex justify-center items-center h-[300px]">
                          <ChezFloraLoader />
                        </div>
                      ) : searchResults.length === 0 && productKeyword ? (
                        <div className="flex flex-col justify-center items-center h-[300px] text-center">
                          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <span className="text-2xl font-bold text-gray-600 mb-2">No Flowers Found</span>
                          <span className="text-gray-500">Try searching with different keywords</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
                          {searchResults.map((product: Product, index: number) => (
                            <UserProductCard
                              key={product.id}
                              product={product}
                              handleGetProductDetails={handleGetProductDetails}
                              index={index}
                            />
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="blogs">
                      <FormTitle
                        title="Flower Care Blogs"
                        comment="Learn how to care for your beautiful flowers"
                        snowStyle="items-start gap-1"
                      />
                      <div className="flex flex-col justify-center items-center h-[300px] text-center">
                        <svg className="w-16 h-16 text-pink-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-2xl font-bold text-gray-600 mb-2">Coming Soon</span>
                        <span className="text-gray-500">Flower care blogs are on the way!</span>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden md:block">
          {isAuthenticated ? <AvatarCustum user={user} /> : <SignInButton />}
        </div>
      </div>

      {/* Header for Larger Screens */}
      <div className="lg:flex w-screen items-center py-6 justify-between px-[6rem] hidden fixed glass-effect shadow-lg border-b border-pink-200 z-[50]">
        <Link to="/shop/home">
          <Logo />
        </Link>
        <nav className="hidden md:hidden lg:flex space-x-8 text-lg">
          <NavigationMenu>
            <NavigationMenuList>
              <NavMenuLink url="/shop/home" text="Home" />
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavMenuLink url="/shop/store" text="Store" />
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavMenuLink url="/shop/quotes" text="Quotes" />
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavMenuLink url="/shop/about" text="About" />
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavMenuLink url="/shop/contact" text="Contact" />
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          {isAuthenticated ? (
            <Sheet
              open={openCartSheet}
              onOpenChange={() => setOpenCartSheet(!openCartSheet)}
            >
              <SheetTrigger>
                <Button
                  onClick={() => setOpenCartSheet(true)}
                  variant="outline"
                  size="icon"
                  className="relative hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 border-pink-200"
                >
                  <AiOutlineShoppingCart className="headerIcons" />
                  <span
                    className={`absolute -top-2 -right-2 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg ${
                      cart && cart?.items.length > 0 ? "inline-flex lg:flex" : "hidden"
                    }`}
                  >
                    {cart?.items.length}
                  </span>
                  <span className="sr-only">User Cart</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[60%] overflow-y-auto">
                <UserCartWrapper
                  setOpenCartSheet={setOpenCartSheet}
                  cart={cart}
                />
              </SheetContent>
            </Sheet>
          ) : (
            <Button
              onClick={() => navigate('/auth/login?returnTo=' + encodeURIComponent('/shop/checkout'))}
              variant="outline"
              size="icon"
              className="relative hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 border-pink-200"
            >
              <AiOutlineShoppingCart className="headerIcons" />
              <span className="sr-only">Login to view cart</span>
            </Button>
          )}
          <div className="w-[2px] h-8 bg-gradient-to-b from-pink-400 to-rose-500 rounded-full"></div>
          <Link to="/shop/search">
            <Button variant="outline" size="icon" className="hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 border-pink-200">
              <BsSearch className="headerIcons" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <div className="w-[2px] h-8 bg-gradient-to-b from-pink-400 to-rose-500 rounded-full"></div>
          {isAuthenticated ? <AvatarCustum user={user} /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
};

export default ShoppingHeader;
