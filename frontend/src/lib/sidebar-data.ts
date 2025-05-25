import { type SidebarData } from "@/types/sidebar";
import {
  Calculator,
  Eye,
  FileInput,
  HelpCircle,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";

export const sidebarData: SidebarData = {
  user: {
    name: "unip",
    email: "ti@aluno.unip.br",
  },
  navGroups: [
    {
      title: "Geral",
      items: [
        {
          title: "Painel de Controle",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Importar Dados",
          url: "/import",
          icon: FileInput,
        },
        {
          title: "Calcular",
          url: "/calculate",
          icon: Calculator,
        },
      ],
    },
    {
      title: "Outros",
      items: [
        {
          title: "Configurações",
          icon: Settings,
          items: [
            {
              title: "Perfil",
              url: "/settings",
              icon: User,
            },
            {
              title: "Conta",
              url: "/settings/account",
              icon: Settings,
            },
            {
              title: "Aparência",
              url: "/settings/appearance",
              icon: Eye,
            },
          ],
        },
        {
          title: "Ajuda & Suporte",
          url: "/help",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
