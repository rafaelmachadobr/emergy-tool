import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/shared/profile-dropdown";
import { ThemeSwitch } from "@/components/shared/theme-switch";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarOpen } from "@/hooks/use-sidebar";
import { Main } from "./main";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const isSidebarOpen = useSidebarOpen();

  return (
    <SidebarProvider defaultOpen={isSidebarOpen}>
      <Sidebar />
      <SidebarInset>
        <Header>
          <div className="ml-auto flex items-center gap-4">
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>{children}</Main>
      </SidebarInset>
    </SidebarProvider>
  );
}
