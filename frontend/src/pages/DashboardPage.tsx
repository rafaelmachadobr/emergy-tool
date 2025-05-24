import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  BarChart3,
  Calculator,
  Clock,
  FileInput,
  FileOutput,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data for charts
const areaChartData = [
  { month: "Jan", value: 400 },
  { month: "Fev", value: 300 },
  { month: "Mar", value: 500 },
  { month: "Abr", value: 280 },
  { month: "Mai", value: 590 },
  { month: "Jun", value: 350 },
  { month: "Jul", value: 470 },
];

const pieChartData = [
  { name: "Renovável", value: 540 },
  { name: "Não Renovável", value: 300 },
  { name: "Serviço", value: 200 },
];

const barChartData = [
  { name: "Process A", value: 350 },
  { name: "Process B", value: 545 },
  { name: "Process C", value: 410 },
  { name: "Process D", value: 280 },
];

const COLORS = ["#0C6E4E", "#4EAAAF", "#75C9C8", "#D3F1EC"];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

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
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total de cálculos
                </p>
                <p className="text-2xl font-bold">248</p>
              </div>
              <div className="p-2 rounded-full bg-muted">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span>12% de aumento em relação ao mês passado</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total de emergia
                </p>
                <p className="text-2xl font-bold">1.435 EM</p>
              </div>
              <div className="p-2 rounded-full bg-muted">
                <BarChart className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span>8,5% de aumento em relação ao mês passado</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Relatórios gerados
                </p>
                <p className="text-2xl font-bold">36</p>
              </div>
              <div className="p-2 rounded-full bg-muted">
                <FileOutput className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>Último relatório: há 2 dias</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Eficiência média
                </p>
                <p className="text-2xl font-bold">82,5%</p>
              </div>
              <div className="p-2 rounded-full bg-muted">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              <span>3,2% de aumento em relação ao mês passado</span>
            </div>
          </CardContent>
        </Card>
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
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
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
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieChartData.map((_, index) => (
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

      {/* Recent Calculations and Bar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cálculos recentes</CardTitle>
            <CardDescription>Seus últimos cálculos de emergia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  <div>
                    <p className="font-medium">Análise de processo {i}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(
                        Date.now() - i * 24 * 60 * 60 * 1000
                      ).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {Math.floor(Math.random() * 200) + 100} EM
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 20) + 10} entradas
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate("/calculate")}
            >
              Ver todos os cálculos
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparação de processos</CardTitle>
            <CardDescription>Valores de emergia por processo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={barChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4EAAAF" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => navigate("/analytics")}
            >
              Ver análise completa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
