import { Toaster } from "@/components/ui/sonner";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { ThemeProvider } from "./contexts/theme-context";
import router from "./routes/router";

const App = () => {
  return (
    <StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  );
};

export default App;
