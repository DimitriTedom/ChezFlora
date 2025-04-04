import { HiOutlineUsers } from "react-icons/hi"; 
// src/components/AdminSidebar.tsx
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { 
  Home,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  CalendarDays,
  BookOpen,
  MessageCircle
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import Logo from "../Common/Logo"


const AdminSidebar = () => {
  const navigate = useNavigate()

  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/admin/dashboard" },
    { title: "Products", icon: Package, path: "/admin/products" },
    { title: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { title: "Quotes", icon: FileText, path: "/admin/quotes" },
    { title: "Blogs", icon: BookOpen, path: "/admin/blog" },
    { title: "Customers", icon: HiOutlineUsers, path: "/admin/users" },
    { title: "Agenda", icon: CalendarDays, path: "/admin/calendar" },
    { title: "Customer Reviews", icon: MessageCircle, path: "/admin/reviews" },
    { title: "Parameters", icon: Settings, path: "/admin/settings" }
  ]

  return (
    <Sidebar className="w-64 h-screen border-r bg-white" collapsible="offcanvas">
      {/* Header de la sidebar */}
      <div className="flex items-center justify-between p-4 border-b">
        <Logo/>
        <SidebarTrigger className="md:hidden" />
      </div>

      {/* Menu principal */}
      <SidebarContent className="flex-1 overflow-auto">
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarMenu className="xl:space-y-4 space-y-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  onClick={() => navigate(item.path) }
                  className="text-sm xl:text-lg p-2 xl:p-4 flex items-center"
                >
                  <item.icon className="mr-2 h-4 w-4 xl:h-12 xl:w-12" />
                  {item.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Version mobile */}
      <div className="md:hidden p-4 border-t">
        <SidebarTrigger className="w-full"/>
      </div>
    </Sidebar>
  )
}

export default AdminSidebar