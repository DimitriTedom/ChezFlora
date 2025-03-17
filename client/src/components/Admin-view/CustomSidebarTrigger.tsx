// components/SidebarTrigger.tsx
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ViewVerticalIcon } from "@radix-ui/react-icons"

export const CustomSidebarTrigger = () => {
  return (
    <SidebarTrigger asChild>
      <Button variant="outline" size="icon">
        <ViewVerticalIcon className="h-6 w-6"/>
      </Button>
    </SidebarTrigger>
  );
};