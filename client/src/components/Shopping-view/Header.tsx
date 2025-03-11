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
  return (
    <div className="w-full">
      <div className="w-full justify-center lg:hidden bg-white/90">
    flora
      </div>
    <div className="lg:flex w-full items-center py-5 justify-between border-b-3 border-b-gray-700 border shadow-md px-[6rem] hidden">
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
              {/* Items du sous-menu Services (utilise Link simple, 
                  mais tu peux aussi mettre NavLink si tu veux un style actif) */}
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
        <PopoverCustum/>
        <BiMenuAltRight className="headerIcons" />
      </div>

      {/* Section des boutons (vide dans cet exemple) */}
      <div className="hidden lg:flex lg:items-center lg:space-x-4">
        <AiOutlineShoppingCart className="headerIcons" />
        <span className="w-[2px] h-8 bg-pink-400"></span>
        <PopoverCustum/>
        <span className="w-[2px] h-8 bg-pink-400"></span>

        {/* <RxAvatar className="headerIcons mr-[1rem]"/> */}
        <AvatarCustum/>
                <SignOrContactButton/>
      </div>
    </div>
    </div>
  );
};

export default ShoppingHeader;
