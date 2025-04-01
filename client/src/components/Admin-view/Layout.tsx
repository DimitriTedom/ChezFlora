// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AdminSidebar from "./Sidebar"
import Adminheader from "./header"

const AdminLayout = () => {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar/>
        
        <div className="flex flex-1 flex-col">

          <div className="flex items-center justify-between p-2 border-b">
            <SidebarTrigger />
            <Adminheader />
          </div>


          <main className="flex-1 bg-gray-100 p-4 md:p-6 min-h-screen">
            <Outlet/>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout