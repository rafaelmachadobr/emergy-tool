// import { api } from "@/lib/axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export function useAuth() {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
//       setIsAuthenticated(true);
//     }

//     setLoading(false);
//   }, []);

//   async function handleLogin() {
//     const {
//       data: { a
//     } = await api.post("/token/");

//     localStorage.setItem("token", JSON.stringify(token));
//     api.defaults.headers.Authorization = `Bearer ${token}`;
//     setIsAuthenticated(true);
//     navigate("/dashboard");
//   }

//   function handleLogout() {
//     setIsAuthenticated(false);
//     localStorage.removeItem("token");
//     delete api.defaults.headers.Authorization;
//     navigate("/");
//   }

//   return { isAuthenticated, loading, handleLogin, handleLogout };
// }
