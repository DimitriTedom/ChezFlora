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
        `text-gray-700 hover:bg-pink-100 transition-colors py-2 px-4 rounded-md ${
          isActive ? "bg-pink-100" : ""
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
      <div className="w-full flex items-center justify-between border-b-pink-700 fixed top-0 z-[50] bg-opacity-50 transition-all duration-300 lg:hidden py-3 px-4 overflow-x-hidden backdrop-blur-md bg-white/30 shadow-md border-b border-white/40">
        <div className="hidden md:block">
          <Logo />
        </div>
        <Sheet>
          <SheetTrigger className="flex justify-center w-full">
            <div className="flex items-center justify-between bg-opacity-50 bg-transparent bg-white shadow-lg rounded-full p-2 w-full md:w-[50%]">
              <button className="mr-2 bg-white rounded-full p-2 flex items-center justify-center shadow-md">
                <MagnifyingGlassIcon className="w-6 h-6 text-black" />
              </button>
              <div className="flex flex-col w-full md:w-[40rem] justify-center rounded-full">
                <Input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Store or Blogs ?"
                  className="bg-white outline-none w-full text-gray-700 px-2 border-none shadow-none"
                />
                <div className="ml-4 text-gray-400 md:block">
                  category • name • event
                </div>
              </div>
              <button className="bg-white rounded-full p-2 flex items-center justify-center shadow-md">
                <CgOptions className="w-6 h-6 text-black" />
              </button>
            </div>
          </SheetTrigger>
          <SheetContent side="top" className="h-screen overflow-y-auto">
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
                              // handleAddToCart={handleAddToCart}
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
          </SheetContent>
        </Sheet>
        <div className="hidden md:block">
          {isAuthenticated ? <AvatarCustum user={user} /> : <SignInButton />}
        </div>
      </div>

      {/* Header for Larger Screens */}
      <div className="lg:flex w-screen items-center py-5 justify-between border-b-3 border-b-gray-700 border px-[6rem] hidden fixed bg-white bg-opacity-85 lg:mb-8 backdrop-blur-md bg-white/30 shadow-md border-b border-white/40">
        <Link to="/shop/home">
          <Logo />
        </Link>
        <nav className="hidden md:hidden lg:flex space-x-6 text-xl">
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
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
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
                  className="relative"
                >
                  <AiOutlineShoppingCart className="headerIcons" />
                  <span
                    className={`absolute -top-2 -right-2 hidden items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-pink-400 rounded-full ${
                      cart && cart?.items.length > 0 ? "inline-flex lg:block" : " "
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
              className="relative"
            >
              <AiOutlineShoppingCart className="headerIcons" />
              <span className="sr-only">Login to view cart</span>
            </Button>
          )}
          <span className="w-[2px] h-8 bg-pink-400"></span>
          <Link to="/shop/search">
            <Button variant="outline" size="icon">
              <BsSearch className="headerIcons" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <span className="w-[2px] h-8 bg-pink-400"></span>
          {isAuthenticated ? <AvatarCustum user={user} /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
};

export default ShoppingHeader;
