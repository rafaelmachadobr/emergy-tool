import { type SidebarData } from "@/types/sidebar";
import {
  Bell,
  Eye,
  Grid,
  HelpCircle,
  LayoutDashboard,
  List,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react";

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Administração Shadcn",
      logo: Grid,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: Grid,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Grid,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "Geral",
      items: [
        {
          title: "Painel de Controle",
          url: "/",
          icon: LayoutDashboard,
        },
        {
          title: "Tarefas",
          url: "/tasks",
          icon: List,
        },
        {
          title: "Aplicativos",
          url: "/apps",
          icon: Grid,
        },
        {
          title: "Conversas",
          url: "/chats",
          badge: "3",
          icon: MessageSquare,
        },
        {
          title: "Usuários",
          url: "/users",
          icon: Users,
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
              icon: User,
            },
            {
              title: "Aparência",
              url: "/settings/appearance",
              icon: Eye,
            },
            {
              title: "Notificações",
              url: "/settings/notifications",
              icon: Bell,
            },
            {
              title: "Exibição",
              url: "/settings/display",
              icon: Eye,
            },
          ],
        },
        {
          title: "Central de Ajuda",
          url: "/help-center",
          icon: HelpCircle,
        },
      ],
    },
  ],
};
