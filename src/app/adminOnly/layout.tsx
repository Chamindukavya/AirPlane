import { AppProps } from "next/app"; // Import AppProps for TypeScript types
import MobileNav from "../../components/ui/mobile-nav"; // Adjust the import path as needed
import "../globals.css"; // Ensure you have the global Tailwind imports
import Sidebar from "../../components/ui/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Sidebar />
      {children}
    </div>
  );
};

export default AdminLayout;
