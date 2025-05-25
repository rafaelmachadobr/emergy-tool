import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type AuthContextData = {
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: RegisterProps) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
};

type UserProps = {
  access: string;
  refresh: string;
};

type SignInProps = {
  username: string;
  password: string;
};

type RegisterProps = {
  username: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const isAuthenticated = !!user;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const access = Cookies.get("access");
    const refresh = Cookies.get("refresh");

    async function refreshAccessToken(refreshToken: string) {
      try {
        const response = await api.post("/token/refresh/", {
          refresh: refreshToken,
        });
        const newAccess = response.data.access;

        Cookies.set("access", newAccess, {
          expires: 30,
          path: "/",
          secure: true,
          sameSite: "strict",
        });

        setUser({ access: newAccess, refresh: refreshToken });
        api.defaults.headers["Authorization"] = `Bearer ${newAccess}`;
      } catch (error) {
        console.log("Refresh token inválido ou expirado, removendo...");
        signOut(false);
      } finally {
        setIsLoading(false);
      }
    }

    if (access && refresh) {
      refreshAccessToken(refresh);
    } else {
      setIsLoading(false);
    }
  }, []);

  async function signIn({ username, password }: SignInProps) {
    try {
      const response = await api.post("/token/", { username, password });
      const { access, refresh } = response.data;

      Cookies.set("access", access, {
        expires: 30,
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("refresh", refresh, {
        expires: 30,
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      setUser({ access, refresh });
      api.defaults.headers["Authorization"] = `Bearer ${access}`;
      toast.success("Logado com sucesso!");
    } catch (error) {
      const err = error as AxiosError;

      if (err.response && err.response.status === 401) {
        toast.error("Usuário ou senha inválidos.");
      } else {
        toast.error("Erro ao acessar!");
        console.log("Erro ao acessar: ", err);
      }
    }
  }

  async function signUp({ username, email, password }: RegisterProps) {
    try {
      await api.post("/users/", { username, email, password });
      toast.success("Usuário cadastrado com sucesso!");
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 400) {
        toast.error("Erro ao cadastrar usuário. Verifique os dados.");
      } else {
        toast.error("Erro ao cadastrar usuário.");
        console.log("Erro ao cadastrar usuário: ", err);
      }
    }
  }

  function signOut(showToast = true) {
    try {
      if (window.confirm("Tem certeza que quer sair?")) {
        Cookies.remove("access");
        Cookies.remove("refresh");
        setUser(undefined);
        delete api.defaults.headers["Authorization"];
        if (showToast) toast.success("Deslogado com sucesso!");
      }
    } catch {
      console.log("Erro ao sair");
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signIn, signUp, signOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
