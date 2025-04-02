import { HiOutlineClipboardList } from "react-icons/hi"; 
import { AiOutlineUser } from "react-icons/ai"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCustomToast } from "@/hooks/useCustomToast";
import { logoutUser } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { User } from "@/store/authSlice";
import {
  LogOut,
  User as UserIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
} from "lucide-react";

export interface AvatarProps {
user: User
}


 function AvatarCustom({user}:AvatarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useCustomToast();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full focus-visible:ring-2 focus-visible:ring-primary">
          <Avatar className="h-10 xl:h-14 xl:w-14 w-10 border-2 border-primary">
            <AvatarImage src={user?.image || "/BestAvatar.jpeg"} alt="user avatar" />
            <AvatarFallback className="bg-primary text-white font-bold">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-background shadow-lg rounded-md border border-border m-4">

        <DropdownMenuLabel className="flex items-center space-x-3 px-3 py-2">
          <Avatar className="h-12 w-12 xl:h-14 xl:w-14 border-2 border-primary">
            <AvatarImage src={user?.image || "/BestAvatar.jpeg"} alt="user avatar" />
            <AvatarFallback className="bg-primary text-white font-bold">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />


        <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent">
          <Link to="/shop/account" className="flex items-center space-x-2">
            <AiOutlineUser className="h-4 w-4 text-muted-foreground" />
            <span>Account DashBoard</span>
          </Link>
        </DropdownMenuItem>


        <DropdownMenuItem asChild className="cursor-pointer hover:bg-accent">
          <Link to="/shop/my-bookings" className="flex items-center space-x-2">
            <HiOutlineClipboardList className="h-4 w-4 text-muted-foreground" />
            <span>My Bookings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />


        <DropdownMenuItem
          onSelect={handleLogOut}
          className="cursor-pointer hover:bg-red-500 hover:text-white"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarCustom