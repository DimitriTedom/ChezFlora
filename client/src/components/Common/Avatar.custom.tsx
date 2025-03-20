import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCustomToast } from "@/hooks/useCustomToast";
import { logoutUser } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { LogOut } from "lucide-react";

interface Avatar {
  name:string;
  role:string;
  image:string;
}
const Avatars:Avatar = {
    name:"Guy Hawkins",
    role:"User",
    image:"/avatar5.svg"
}

export  function AvatarCustum() {

  const dispatch = useDispatch<AppDispatch>();
  const {showToast} = useCustomToast()
  const handleLogOut = () =>{
    dispatch(logoutUser()).unwrap().then((data)=>{
      showToast({
        message: `${data.message}`,
        subtitle: "See you soon !",
        type: "warning",
        duration: 5000,
      });
    })

  }

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-12 w-12 border-rose-300 border-2">
          <AvatarImage src={Avatars.image} alt="avatar" />
          <AvatarFallback>GH</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{Avatars.name}</p>
          <p className="text-xs text-muted-foreground">
            {Avatars.role}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
         to="/admin/profile">
          Profil
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/admin/settings">
          Parameters
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={handleLogOut}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log Out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  );
}
