import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type AuthContextData = {
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  token: string;
};

type SignInProps = {
  username: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setUser({ token });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  async function signIn({ username, password }: SignInProps) {
    try {
      const response = await api.post("/token/", { username, password });
      const token = response.data.access;

      Cookies.set("token", token, {
        expires: 30,
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      setUser({ token });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      const err = error as AxiosError;

      if (
        err.response &&
        err.response.status === 401 &&
        (err.response.data as { detail?: string })?.detail ===
          "No active account found with the given credentials"
      ) {
        toast.error("Usuário ou senha inválidos.");
      } else {
        toast.error("Erro ao acessar!");
        console.log("Erro ao acessar: ", err);
      }
    }
  }

  function signOut() {
    try {
      Cookies.remove("token");
      setUser(undefined);
      delete api.defaults.headers["Authorization"];
      toast.success("Deslogado com sucesso!");
    } catch {
      console.log("Erro ao sair");
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
