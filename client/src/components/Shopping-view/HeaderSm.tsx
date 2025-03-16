import { AiFillHome } from "react-icons/ai"; 
import { MdAccountCircle } from "react-icons/md";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltRight } from "react-icons/bi";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Logo from "../Common/Logo";
import SignOrContactButton from "./SignOrContactButton";
import SocialIcons from "../Common/Contact/SocialIcons";

export interface NavProps {
  title: string;
  icon: React.ElementType;
  url: string;
}

const NavMenuLink = ({ url, text }: { url: string; text: string }) => (
  <NavigationMenuItem className="w-full">
    <NavLink
      to={url}
      className={({ isActive }) =>
        // On ajoute une classe supplémentaire si le lien est actif
        `text-gray-700 hover:bg-pink-100 transition-colors py-4 px-4 rounded-md text-xl w-full ${
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
    <NavigationMenuTrigger className="w-full text-gray-700 hover:bg-pink-100 active:bg-pink-100 transition-colors py-2 px-4 rounded-md text-xl">
      {text}
    </NavigationMenuTrigger>
    <NavigationMenuContent className="flex flex-col p-4 w-fit h-fit gap-3">
      {children}
    </NavigationMenuContent>
  </NavigationMenuItem>
);
// Composant de lien standard pour la barre de navigation mobile/tablette
const NavMenuLinkSm = ({ title, icon: Icon, url }: NavProps) => (
  <NavigationMenuItem className="w-full">
    <NavLink
      to={url}
      className={({ isActive }) =>
        `flex flex-col items-center text-gray-600 space-y-1 transition-colors p-2 rounded-md w-full ${
          isActive ? "bg-pink-100" : ""
        }`
      }
    >
      <Icon className="text-2xl" />
      <span className="text-xs font-semibold">{title}</span>
    </NavLink>
  </NavigationMenuItem>
);
const HeaderSm = () => {
  // Définition dynamique des éléments de la barre de navigation
  const navItems: NavProps[] = [
    { title: "Home", icon: AiFillHome, url: "/shop/home" },
    { title: "Cart", icon: AiOutlineShoppingCart, url: "/android/cart" },
    { title: "Account", icon: MdAccountCircle, url: "/android/account" },
    { title: "Menu", icon: BiMenuAltRight, url: "/shop/menu" },
  ];

  return (
    <div className="w-full flex items-center px-10 md:px-14 gap-8 h-16 justify-between bg-white shadow-2xl fixed bg-opacity-90 bottom-0 border-t-2 border-pink-200">
      {navItems.map((item, index) => {
        // Pour l'item "Menu", utilisons le composant Sheet de shadcn
        if (item.title === "Menu") {
          return (
            <NavigationMenu>
              <NavigationMenuList className="flex justify-around w-full">
                <NavigationMenuItem key={index}>
                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        className="flex flex-col items-center text-gray-600 space-y-1 transition-colors p-2 rounded-md"
                        // Ici, tu peux ajouter d'autres styles si besoin
                      >
                        <item.icon className="text-2xl" />
                        <span className="text-xs font-semibold">
                          {item.title}
                        </span>
                      </button>
                    </SheetTrigger>
                    <SheetContent className="py-8 px-0 flex flex-col items-center gap-5">
                      {/* Contenu du Sheet pour le menu */}
                      <div className="space-y-5 px-4">
                      <Link to="/shop/home">
                        <Logo />
                      </Link>
                      <p>Discover the most outstanding articles on all events types. Write Blogs and share them</p>
                      </div>
                      <nav className="border-t-2 border-pink-200 w-full py-5 flex flex-col gap-4">
                        <NavigationMenu >
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
                                <Link
                                  to="/service1"
                                  className="transition-colors px-4 py-2"
                                >
                                  Service 1
                                </Link>
                              </NavigationMenuLink>
                              <NavigationMenuLink className="rounded-md hover:bg-pink-100">
                                <Link
                                  to="/service2"
                                  className="transition-colors px-4 py-2"
                                >
                                  Service 2
                                </Link>
                              </NavigationMenuLink>
                              <NavigationMenuLink className="rounded-md hover:bg-pink-100">
                                <Link
                                  to="/service3"
                                  className="transition-colors px-4 py-2"
                                >
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
                      <div className="space-y-6 flex flex-col">
                      <SignOrContactButton/>
                      <SocialIcons/>
                      </div>
                    </SheetContent>
                  </Sheet>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          );
        } else {
          return (
            <NavigationMenu>
              <NavigationMenuList className="flex justify-around">
                <NavMenuLinkSm
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  url={item.url}
                />
              </NavigationMenuList>
            </NavigationMenu>
          );
        }
      })}
    </div>
  );
};

export default HeaderSm;
