import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/ui/sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar/primitive";

const DashboardPage = () => {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" />
      <SidebarInset>
        <main>
          <Header title="Dashboard" />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;
