import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarOpen } from "@/hooks/use-sidebar";

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isSidebarOpen = useSidebarOpen();

  return (
    <SidebarProvider defaultOpen={isSidebarOpen}>{children}</SidebarProvider>
  );
}
