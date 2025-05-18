import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/shared/profile-dropdown";
import { ThemeSwitch } from "@/components/shared/theme-switch";
import { SidebarInset } from "@/components/ui/sidebar";
import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header>
          <div className="ml-auto flex items-center gap-4">
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6"></div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
};

export default DashboardPage;
