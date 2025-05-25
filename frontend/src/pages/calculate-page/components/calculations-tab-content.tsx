import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetEmergyCalculations } from "@/hooks/data/use-get-emergy-calculations";
import { Separator } from "@radix-ui/react-select";
import {
  Activity,
  BarChart3,
  Calculator,
  Calendar,
  Filter,
  Hash,
  Recycle,
  Search,
  Settings,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

export const CalculationsTabContent: React.FC = () => {
  const { data: emergyCalculations = [] } = useGetEmergyCalculations();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCalculations = emergyCalculations.filter((calc) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      String(calc.useful_product).toLowerCase().includes(searchLower) ||
      String(calc.matrix).toLowerCase().includes(searchLower)
    );
  });

  const metricsConfig = {
    F: {
      icon: Zap,
      label: "Fluxo de Energia",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    N: {
      icon: TrendingUp,
      label: "Recursos Não Renováveis",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    R: {
      icon: Recycle,
      label: "Recursos Renováveis",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    Y: {
      icon: Target,
      label: "Emergia Total",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    ELR: {
      icon: BarChart3,
      label: "Taxa de Carga Ambiental",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    EYR: {
      icon: Activity,
      label: "Taxa de Rendimento",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calculator className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total de Cálculos
                </p>
                <p className="text-2xl font-bold">
                  {emergyCalculations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Média EYR
                </p>
                <p className="text-2xl font-bold">
                  {emergyCalculations.length > 0
                    ? (
                        emergyCalculations.reduce(
                          (acc, calc) => acc + calc.results.EYR,
                          0
                        ) / emergyCalculations.length
                      ).toLocaleString("pt-BR", { maximumFractionDigits: 1 })
                    : "0"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Resultados Filtrados
                </p>
                <p className="text-2xl font-bold">
                  {filteredCalculations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de busca e filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por produto útil ou matriz..."
            className="pl-10 h-11"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" className="h-11">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Lista de cálculos */}
      <div className="space-y-6">
        {filteredCalculations.length > 0 ? (
          filteredCalculations.map((calc) => (
            <Card key={calc.id} className="shadow-lg border-0 bg-card p-0">
              <CardHeader className="bg-primary text-primary-foreground rounded-t-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      Produto Útil: {calc.useful_product}
                    </CardTitle>
                    <div className="flex flex-wrap gap-4 mt-2 text-primary-foreground">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        <span>ID: {calc.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span>Matriz: {calc.matrix}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(calc.created_at).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-secondary/80 text-secondary-foreground border-secondary"
                  >
                    Configuração: {calc.scale_config}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Resultados do Cálculo
                    </h3>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {(["F", "N", "R", "Y", "ELR", "EYR"] as const).map(
                        (key) => {
                          const config = metricsConfig[key];
                          const IconComponent = config.icon;

                          return (
                            <Card
                              key={key}
                              className="border border-foreground hover:shadow-md transition-shadow bg-muted/50"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div
                                    className={`p-2 rounded-lg ${config.bgColor} ${config.color}`}
                                  >
                                    <IconComponent className="w-5 h-5" />
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className="text-xs font-mono"
                                  >
                                    {key}
                                  </Badge>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-2xl font-bold text-foreground">
                                    {typeof calc.results[key] === "number"
                                      ? calc.results[key].toLocaleString("pt-BR")
                                      : calc.results[key]}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {config.label}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        }
                      )}
                    </div>

                    <Separator className="my-6" />

                    {/* Summary Section */}
                    <div className="bg-gradient-to-r from-muted to-muted/50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">
                            Unidade de Medida
                          </h4>
                          <p className="text-lg font-mono bg-muted text-foreground px-3 py-2 rounded border">
                            {typeof calc.results.unit === "number"
                              ? (calc.results.unit as number).toLocaleString("pt-BR")
                              : String(calc.results.unit)}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">
                            Total Transformity
                          </h4>
                          <p className="text-lg font-mono bg-muted text-foreground px-3 py-2 rounded border">
                            {typeof calc.results.total_transformity === "number"
                              ? calc.results.total_transformity.toLocaleString("pt-BR")
                              : calc.results.total_transformity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="shadow-sm bg-card">
            <CardContent className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Calculator className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="font-medium text-lg text-foreground">
                {searchTerm
                  ? "Nenhum resultado encontrado"
                  : "Nenhum cálculo encontrado"}
              </h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm
                  ? "Tente ajustar sua busca ou limpar os filtros."
                  : "Tente ajustar seus filtros ou crie um novo cálculo."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
