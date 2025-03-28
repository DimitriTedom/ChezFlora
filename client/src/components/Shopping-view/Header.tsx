"use client";

import { CgOptions } from "react-icons/cg";
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Logo from "../Common/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink as NavLinkUI,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import PopoverCustum from "../Common/PopoverCustum";
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

// Define interface for NavMenuLink props.
interface NavMenuLinkProps {
  url: string;
  text: string;
}

// NavMenuLink renders a single navigation link.
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

// Define interface for NavMenuDropdown props.
interface NavMenuDropdownProps {
  text: string;
  children: React.ReactNode;
}

// NavMenuDropdown renders a dropdown menu in the navigation.
const NavMenuDropdown: React.FC<NavMenuDropdownProps> = ({ text, children }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="text-gray-700 hover:bg-pink-100 transition-colors py-2 px-4 rounded-md text-xl">
      {text}
    </NavigationMenuTrigger>
    <NavigationMenuContent className="flex flex-col p-4 w-fit h-fit gap-3">
      {children}
    </NavigationMenuContent>
  </NavigationMenuItem>
);

const ShoppingHeader: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  // Access user and authentication state from Redux.
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  // Access cart state from Redux.
  const { cartItems } = useSelector((state: RootState) => state.shoppingCart);
  const [openCartSheet, setOpenCartSheet] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch cart items whenever user changes or cartItems update.
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user, cartItems]);

  // console.log(cartItems, "header");

  return (
    <div className="w-screen lg:mb-32 xl:mb-32 overflow-x-hidden">
      {/* Mobile Header */}
      <div className="w-full flex items-center justify-between border-b-[1px] border-b-pink-700 fixed top-0 z-[50] bg-opacity-50 backdrop-blur-sm transition-all duration-300 lg:hidden bg-white/80 py-3 px-4 overflow-x-hidden">
        <div className="hidden md:block">
          <Logo />
        </div>
        <Sheet>
          <div className="flex items-center justify-between bg-opacity-50 bg-transparent bg-white shadow-lg rounded-full p-2 w-full md:w-[50%]">
            <button className="mr-2 bg-white rounded-full p-2 flex items-center justify-center shadow-md">
              <MagnifyingGlassIcon className="w-6 h-6 text-black" />
            </button>
            <div className="flex flex-col w-[17rem] md:w-[40rem] justify-center">
              <Input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Which flower ?"
                className="bg-white outline-none w-full text-black px-2 border-none shadow-none"
              />
              <div className="ml-4 text-gray-400 md:block">
                where • week • Event
              </div>
            </div>
            <SheetTrigger>
              <button className="bg-white rounded-full p-2 flex items-center justify-center shadow-md">
                <CgOptions className="w-6 h-6 text-black" />
              </button>
            </SheetTrigger>
          </div>
          <SheetContent side="top" className="h-screen"></SheetContent>
        </Sheet>
        <div className="hidden md:block">
          {isAuthenticated ? <AvatarCustum user={user} /> : <SignInButton />}
        </div>
      </div>

      {/* Header for Larger Screens */}
      <div className="lg:flex w-screen items-center py-5 justify-between border-b-3 border-b-gray-700 border shadow-md px-[6rem] hidden fixed bg-white bg-opacity-85 lg:mb-8">
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
              <NavMenuDropdown text="Services">
                <NavigationMenuLink className="rounded-md hover:bg-pink-100">
                  <Link to="/service1" className="transition-colors px-4 py-2">
                    Service 1
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink className="rounded-md hover:bg-pink-100">
                  <Link to="/service2" className="transition-colors px-4 py-2">
                    Service 2
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink className="rounded-md hover:bg-pink-100">
                  <Link to="/service3" className="transition-colors px-4 py-2">
                    Service 3
                  </Link>
                </NavigationMenuLink>
              </NavMenuDropdown>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavMenuLink url="/shop/blog" text="Blog" />
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
          <Sheet
            open={openCartSheet}
            onOpenChange={() => setOpenCartSheet(!openCartSheet)}
          >
            <SheetTrigger>
              <button onClick={() => setOpenCartSheet(true)}>
                <AiOutlineShoppingCart className="headerIcons" />
                <span className="sr-only">User Cart</span>
              </button>
            </SheetTrigger>
            <SheetContent className="w-[60%] overflow-y-auto">
              <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
                cartItems={
                  cartItems && cartItems.items && cartItems.items.length > 0
                    ? cartItems.items
                    : []
                }
              />
            </SheetContent>
          </Sheet>
          <span className="w-[2px] h-8 bg-pink-400"></span>
          <Button variant="outline" size="icon">
            <PopoverCustum />
          </Button>
          <span className="w-[2px] h-8 bg-pink-400"></span>
          {isAuthenticated ? <AvatarCustum user={user} /> : <SignInButton />}
        </div>
      </div>
    </div>
  );
};

export default ShoppingHeader;
