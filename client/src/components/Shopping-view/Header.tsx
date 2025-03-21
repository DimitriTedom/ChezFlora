import { CgOptions } from "react-icons/cg";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Logo from "../Common/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import PopoverCustum from "../Common/PopoverCustum";
import  AvatarCustum  from "../Common/Avatar.custom";
import SignInButton from "./SignOrContactButton";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


const NavMenuLink = ({ url, text }: { url: string; text: string }) => (
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

const NavMenuDropdown = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="text-gray-700 hover:bg-pink-100 transition-colors py-2 px-4 rounded-md text-xl">
      {text}
    </NavigationMenuTrigger>
    <NavigationMenuContent className="flex flex-col p-4 w-fit h-fit gap-3">
      {children}
    </NavigationMenuContent>
  </NavigationMenuItem>
);

const ShoppingHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <div className="w-screen lg:mb-32 xl:mb-32 overflow-x-hidden">
      <div className="w-full flex items-center justify-between border-b-[1px] border-b-pink-700 fixed top-0  z-[50] bg-opacity-50 backdrop-blur-sm transition-all duration-300 lg:hidden bg-white/80 py-3 px-4 overflow-x-hidden">
        <div className="hidden md:block">
        <Logo/>
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
          <SheetContent side="top" className="h-screen">

          </SheetContent>
        </Sheet>
        <div className="hidden md:block">{isAuthenticated ? (
            <AvatarCustum user={user} />
          ) : (
            <SignInButton />
          )}</div>
      </div>
    {/* HEADER FOR LG> */}
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
          <AiOutlineShoppingCart className="headerIcons" />
          <span className="w-[2px] h-8 bg-pink-400"></span>
          <PopoverCustum />
          <span className="w-[2px] h-8 bg-pink-400"></span>

          {isAuthenticated ? (
            <AvatarCustum user={user} />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingHeader;
