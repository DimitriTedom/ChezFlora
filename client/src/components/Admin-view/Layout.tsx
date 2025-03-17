// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "./Sidebar"
import Adminheader from "./header"
// import AdminSidebar from "@/components/AdminSidebar"
// import AdminHeader from "@/components/AdminHeader"

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Contenu principal */}
        <div className="flex flex-1 flex-col">
          {/* Header avec trigger mobile */}
          <div className="sticky top-0 z-10 md:hidden">
            <Adminheader />
            <SidebarTrigger className="absolute left-4 top-4" />
          </div>

          {/* Contenu de la page */}
          <main className="flex-1 bg-muted/40 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout