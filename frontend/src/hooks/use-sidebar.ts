import Cookies from "js-cookie";

export function useSidebarOpen(): boolean {
  return Cookies.get("sidebar_state") !== "false";
}
