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
  Users,
  Settings,
  CalendarDays,
  BookOpen,
  MessageCircle
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const AdminSidebar = () => {
  const navigate = useNavigate()

  const menuItems = [
    { title: "Tableau de bord", icon: Home, path: "/admin/dashboard" },
    { title: "Produits", icon: Package, path: "/admin/products" },
    { title: "Commandes", icon: ShoppingCart, path: "/admin/orders" },
    { title: "Devis", icon: FileText, path: "/admin/quotes" },
    { title: "Blog", icon: BookOpen, path: "/admin/blog" },
    { title: "Utilisateurs", icon: Users, path: "/admin/users" },
    { title: "Agenda", icon: CalendarDays, path: "/admin/calendar" },
    { title: "Avis clients", icon: MessageCircle, path: "/admin/reviews" },
    { title: "Paramètres", icon: Settings, path: "/admin/settings" }
  ]

  return (
    <Sidebar className="w-64 h-screen border-r bg-background">
      {/* Header de la sidebar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="text-lg font-semibold text-primary">ChezFlora</div>
        <SidebarTrigger className="md:hidden" />
      </div>

      {/* Menu principal */}
      <SidebarContent className="flex-1 overflow-auto">
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  onClick={() => navigate(item.path)}
                  className="text-sm"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Version mobile */}
      <div className="md:hidden p-4 border-t">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  )
}

export default AdminSidebar