import AdminHeader from "@/components/admin-header";
import { AdminSidebar } from "@/components/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full">
        <AdminHeader />
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
