import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AiFillHome, AiOutlineShoppingCart } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
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
import SocialIcons from "../Common/Contact/SocialIcons";
import SignInButton from "./SignOrContactButton";
import AvatarCustum from "../Common/Avatar.custom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import UserCartWrapper from "./CartWrapper";
import { fetchCartItems } from "@/store/shop/cartSlice";
import { LogOut, SettingsIcon, User2Icon, UserCog2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

const HeaderSm: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { cartItems } = useSelector((state: RootState) => state.shoppingCart);
  const [openCartSheet, setOpenCartSheet] = useState<boolean>(false);
  const dispactch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispactch(fetchCartItems(user?.id));
  }, [dispactch, user]);
  // Define the navigation items
  const navItems: NavProps[] = [
    { title: "Home", icon: AiFillHome, url: "/shop/home" },
    { title: "Cart", icon: AiOutlineShoppingCart, url: "/shop/cart" },
    { title: "Account", icon: MdAccountCircle, url: "/shop/account" },
    { title: "Menu", icon: BiMenuAltRight, url: "/shop/menu" },
  ];
  const handleLogOut = () => {
    dispatch(logoutUser())
      .unwrap()
      .then((data) => {
        showToast({
          message: `${data.message}`,
          subtitle: "See you soon!",
          type: "warning",
          duration: 5000,
        });
      })
      .catch((error) => {
        showToast({
          message: "Logout failed.",
          subtitle: error.message || "Please try again.",
          type: "error",
          duration: 5000,
        });
      });
  };
  return (
    <div className="w-screen overflow-x-hidden flex items-center px-10 md:px-14 gap-8 h-16 justify-between bg-white shadow-2xl fixed bg-opacity-90 bottom-0 border-t-2 border-pink-200">
      {navItems.map((item, index) => {
        if (item.title === "Menu") {
          return (
            <NavigationMenu key={index}>
              <NavigationMenuList className="flex justify-around w-full">
                <NavigationMenuItem>
                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="flex flex-col items-center text-gray-600 space-y-1 transition-colors p-2 rounded-md">
                        <item.icon className="text-2xl" />
                        <span className="text-xs font-semibold">
                          {item.title}
                        </span>
                      </button>
                    </SheetTrigger>
                    <SheetContent className="py-8 px-0 flex flex-col items-center gap-5 justify-between">
                      {/* Menu header content */}
                      <div>
                        <div className="space-y-5 px-4">
                          <Link to="/shop/home">
                            <Logo />
                          </Link>
                          <p>
                            Discover outstanding articles on all event types.
                            Write Blogs and share them.
                          </p>
                        </div>
                        <nav className="border-t-2 border-pink-200 w-full py-5 flex flex-col gap-4">
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
                              <NavMenuLink url="/shop/blog" text="Blog" />
                            </NavigationMenuList>
                          </NavigationMenu>
                          <NavigationMenu>
                            <NavigationMenuList>
                              <NavMenuLink url="/shop/about" text="About" />
                            </NavigationMenuList>
                          </NavigationMenu>
                        </nav>
                      </div>
                      <div className="space-y-6 flex flex-col">
                        {/* Conditionally render SignInButton only if not authenticated */}
                        {!isAuthenticated && <SignInButton />}
                        <SocialIcons />
                      </div>
                    </SheetContent>
                  </Sheet>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          );
        } else if (item.title === "Account") {
          return (
            <NavigationMenu key={index}>
              <NavigationMenuList className="flex justify-around w-full">
                <NavigationMenuItem>
                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="flex flex-col items-center text-gray-600 space-y-1 transition-colors p-2 rounded-md">
                        <item.icon className="text-2xl" />
                        <span className="text-xs font-semibold">
                          {item.title}
                        </span>
                      </button>
                    </SheetTrigger>
                    <SheetContent className="py-8 px-4 flex flex-col items-center gap-5">
                      {isAuthenticated && user ? (
                        // If authenticated, display the AvatarCustom with additional account links
                        <div className="flex flex-col items-center space-y-4 w-full">
                          <div className="self-start w-full bg-pink-100 border border-pink-200 rounded-md">
                            <div className="flex items-center space-x-3 px-3 py-2">
                              <Avatar className="h-16 w-16 xl:h-14 xl:w-14 border-2 border-primary">
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
                                <p className="text-xs text-muted-foreground">
                                  {user?.email}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Link
                            to="/shop/account"
                            className="flex items-center space-x-2 w-full"
                          >
                            <User2Icon className="h-4 w-4 text-muted-foreground" />
                            <span>Account</span>
                          </Link>
                          <Link
                            to="/shop/settings"
                            className="flex items-center space-x-2 w-full"
                          >
                            <UserCog2Icon className="h-4 w-4 text-muted-foreground" />
                            <span>Settings</span>
                          </Link>

                          <div
                            onSelect={handleLogOut}
                            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground w-full flex items-center space-x-2"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Log Out</span>
                          </div>
                        </div>
                      ) : (
                        // Otherwise, show the SignIn button
                        <SignInButton />
                      )}
                    </SheetContent>
                  </Sheet>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          );
        } else if (item.title === "Cart") {
          return (
            <NavigationMenu key={index}>
              <NavigationMenuList className="flex justify-around w-full">
                <NavigationMenuItem>
                  <Sheet
                    open={openCartSheet}
                    onOpenChange={() => setOpenCartSheet(!openCartSheet)}
                  >
                    <SheetTrigger asChild>
                      <button className="flex flex-col items-center text-gray-600 space-y-1 transition-colors p-2 rounded-md">
                        <item.icon className="text-2xl" />
                        <span className="text-xs font-semibold">
                          {item.title}
                        </span>
                      </button>
                    </SheetTrigger>
                    <SheetContent className="py-8 px-2 flex flex-col items-center gap-5 overflow-y-auto">
                      <UserCartWrapper
                        cartItems={
                          cartItems &&
                          cartItems.items &&
                          cartItems.items.length > 0
                            ? cartItems.items
                            : []
                        }
                      />
                    </SheetContent>
                  </Sheet>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          );
        } else {
          return (
            <NavigationMenu key={index}>
              <NavigationMenuList className="flex justify-around">
                <NavMenuLinkSm
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
