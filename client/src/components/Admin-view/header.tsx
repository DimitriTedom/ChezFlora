// src/components/AdminHeader.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { Link } from "react-router-dom"
// import Link from "next/link"
interface Avatar {
  name:string;
  role:string;
  image:string;
}
const Avatars:Avatar = {
    name:"Guy Hawkins",
    role:"Admin",
    image:"/avatar4.svg"
}
const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-background">
      {/* Logo ou titre */}
      {/* <div className="text-xl font-semibold text-primary">ChezFlora</div> */}

      {/* Menu utilisateur */}
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
          <DropdownMenuItem onSelect={() => console.log("Logout")}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default AdminHeader