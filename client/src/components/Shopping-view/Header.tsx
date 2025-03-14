import { CgOptions } from "react-icons/cg";
// import { RxAvatar } from "react-icons/rx";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
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
import { AvatarCustum } from "../Common/Avatar.custom";
import SignOrContactButton from "./SignOrContactButton";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Input } from "../ui/input";
// Composant personnalisé pour les liens simples
const NavMenuLink = ({ url, text }: { url: string; text: string }) => (
  <NavigationMenuItem>
    <NavLink
      to={url}
      className={({ isActive }) =>
        // On ajoute une classe supplémentaire si le lien est actif
        `text-gray-700 hover:bg-pink-100 transition-colors py-2 px-4 rounded-md ${
          isActive ? "bg-pink-100" : ""
        }`
      }
    >
      {text}
    </NavLink>
  </NavigationMenuItem>
);

// Composant personnalisé pour les menus déroulants
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

  return (
    <div className="w-screen lg:mb-32 xl:mb-32">
      <div className="w-full justify-center border-b-[1px] border-b-pink-700 fixed top-0  z-[50] bg-opacity-50 backdrop-blur-sm transition-all duration-300 lg:hidden bg-white/80 py-3 px-4">
        <Sheet>
          <div className="flex items-center justify-between bg-opacity-50 bg-transparent bg-white shadow-lg rounded-full p-2 w-full">
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
      </div>

      <div className="lg:flex w-screen items-center py-5 justify-between border-b-3 border-b-gray-700 border shadow-md px-[6rem] hidden fixed bg-white bg-opacity-85 lg:mb-8">
        {/* Logo renvoie sur la page d'accueil */}
        <Link to="/shop/home">
          <Logo />
        </Link>

        {/* Navigation principale (version desktop) */}
        <nav className="hidden md:hidden lg:flex space-x-6 text-xl">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Menu Accueil */}
              <NavMenuLink url="/shop/home" text="Home" />
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              {/* Menu Store */}
              <NavMenuLink url="/shop/store" text="Store" />
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              {/* Menu Services avec sous-menu */}
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
              {/* Menu Blog */}
              <NavMenuLink url="/shop/blog" text="Blog" />
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              {/* Menu About */}
              <NavMenuLink url="/shop/about" text="About" />
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Icônes mobiles (visibles uniquement quand la navbar est cachée) */}
        <div className="flex items-center lg:hidden space-x-[4%]">
          <AiOutlineShoppingCart className="headerIcons" />
          <PopoverCustum />
          <BiMenuAltRight className="headerIcons" />
        </div>

        {/* Section des boutons (vide dans cet exemple) */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <AiOutlineShoppingCart className="headerIcons" />
          <span className="w-[2px] h-8 bg-pink-400"></span>
          <PopoverCustum />
          <span className="w-[2px] h-8 bg-pink-400"></span>

          {/* <RxAvatar className="headerIcons mr-[1rem]"/> */}
          <AvatarCustum />
          <SignOrContactButton />
        </div>
      </div>
    </div>
  );
};

export default ShoppingHeader;
