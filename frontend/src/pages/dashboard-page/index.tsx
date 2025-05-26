import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetEmergyStats } from "@/hooks/data/use-get-emergy-stats";
import { getDay, parseISO } from "date-fns";
import {
  BarChart3,
  Calculator,
  Clock,
  FileInput,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatsCard } from "./components/stats-card";

const COLORS = ["#0C6E4E", "#4EAAAF", "#75C9C8", "#D3F1EC"];

const DashboardPage: React.FC = () => {
  const { data: emergyStats } = useGetEmergyStats();
  const navigate = useNavigate();

  // Transformação dos dados para o PieChart
  const emergyPieData = React.useMemo(() => {
    if (
      emergyStats &&
      emergyStats.emergy_distribution_percent &&
      typeof emergyStats.emergy_distribution_percent === "object"
    ) {
      return Object.entries(emergyStats.emergy_distribution_percent).map(
        ([name, value]) => ({
          name,
          value,
        })
      );
    }
    return [];
  }, [emergyStats]);

  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const areaChartData = React.useMemo(() => {
    if (
      emergyStats &&
      emergyStats.daily_trends &&
      typeof emergyStats.daily_trends === "object"
    ) {
      // Inicializa o acumulador para cada dia da semana
      const weekData: Record<string, number> = {
        Domingo: 0,
        Segunda: 0,
        Terça: 0,
        Quarta: 0,
        Quinta: 0,
        Sexta: 0,
        Sábado: 0,
      };

      Object.entries(emergyStats.daily_trends).forEach(([date, value]) => {
        const dayIndex = getDay(parseISO(date)); // 0=Domingo, 1=Segunda, ...
        const dayName = weekDays[dayIndex];
        weekData[dayName] += value as number;
      });

      // Retorna um array para o gráfico
      return weekDays.map((day) => ({
        day,
        value: weekData[day],
      }));
    }
    return [];
  }, [emergyStats, weekDays]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Painel de Controle
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está um panorama dos seus cálculos de
            emergia.
          </p>
        </div>
        <Button
          onClick={() => navigate("/import")}
          className="bg-primary hover:bg-primary/90"
        >
          <FileInput className="mr-2 h-4 w-4" />
          Importar novos dados
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de cálculos"
          value={
            emergyStats?.total_calculations?.toLocaleString("pt-BR") || "0"
          }
          icon={<Calculator className="h-5 w-5 text-primary" />}
          changeIcon={<TrendingUp className="h-3 w-3 mr-1 text-green-500" />}
        />

        <StatsCard
          title="Média de emergia por cálculo"
          value={
            (emergyStats?.total_emergy_Y?.toLocaleString("pt-BR") || "0") +
            " EM"
          }
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
          changeIcon={<TrendingUp className="h-3 w-3 mr-1 text-green-500" />}
        />

        <StatsCard
          title="Arquivos importados"
          value={
            emergyStats?.total_files_imported?.toLocaleString("pt-BR") || "0"
          }
          icon={<FileInput className="h-5 w-5 text-primary" />}
          changeIcon={<TrendingUp className="h-3 w-3 mr-1 text-green-500" />}
        />

        <StatsCard
          title="Eficiência média"
          value={emergyStats?.average_efficiency.toLocaleString("pt-BR") || "0"}
          icon={<Clock className="h-5 w-5 text-primary" />}
          changeIcon={<TrendingUp className="h-3 w-3 mr-1 text-green-500" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Area Chart */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tendências mensais de emergia</CardTitle>
            <CardDescription>
              Total de emergia calculada por mês
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={areaChartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0C6E4E" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0C6E4E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tickFormatter={(day) => day} />
                  <YAxis
                    tickFormatter={(value) =>
                      value >= 1_000_000
                        ? `${(value / 1_000_000).toFixed(1)}M`
                        : value >= 1_000
                        ? `${(value / 1_000).toFixed(1)}k`
                        : value
                    }
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    labelFormatter={(day) => day}
                    formatter={(value: number) =>
                      value >= 1_000_000
                        ? `${(value / 1_000_000).toFixed(2)} milhões`
                        : value >= 1_000
                        ? `${(value / 1_000).toFixed(2)} mil`
                        : value
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0C6E4E"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de emergia</CardTitle>
            <CardDescription>Por tipo de recurso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emergyPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {emergyPieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
