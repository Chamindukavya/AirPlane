import { AppProps } from "next/app"; // Import AppProps for TypeScript types
import MobileNav from "../../components/ui/mobile-nav"; // Adjust the import path as needed
import "../globals.css"; // Ensure you have the global Tailwind imports
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AppSidebar } from "@/components/ui/App-sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-black text-white">
      <div className="w-[20%] h-full">
        <AppSidebar />
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
