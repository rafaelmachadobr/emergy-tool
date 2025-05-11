import React from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import router from "./router";

const App = () => {
  return (
    <React.StrictMode>
      <Toaster />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
