import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calculator, FileInput, Search } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const calculations = [
  {
    id: 1,
    name: "Solar Panel Production",
    date: "2023-08-15",
    type: "Renewable",
    emergiaValue: 1240.5,
    inputs: 15,
    status: "completed",
  },
  {
    id: 2,
    name: "Wind Turbine Manufacturing",
    date: "2023-09-20",
    type: "Renewable",
    emergiaValue: 980.2,
    inputs: 12,
    status: "completed",
  },
  {
    id: 3,
    name: "Concrete Production",
    date: "2023-10-05",
    type: "Non-Renewable",
    emergiaValue: 2340.8,
    inputs: 18,
    status: "completed",
  },
  {
    id: 4,
    name: "Electronic Assembly",
    date: "2023-11-12",
    type: "Service",
    emergiaValue: 560.3,
    inputs: 9,
    status: "completed",
  },
  {
    id: 5,
    name: "Paper Manufacturing",
    date: "2023-12-01",
    type: "Non-Renewable",
    emergiaValue: 870.6,
    inputs: 11,
    status: "in-progress",
  },
];

const CalculatePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCalculation, setSelectedCalculation] = useState<number | null>(
    null
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleCalculationSelect = (id: number) => {
    setSelectedCalculation(id);
  };

  const handleNewCalculation = () => {
    toast.success("Iniciando novo cálculo...", {
      description: (
        <span className="text-foreground">
          Por favor, importe ou insira seus dados para começar o processo.
        </span>
      ),
    });
  };

  const filteredCalculations = calculations.filter((calc) => {
    const matchesSearch = calc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "" || calc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calcular</h1>
          <p className="text-muted-foreground">
            Processe seus dados para calcular valores de emergia.
          </p>
        </div>
        <Button
          onClick={handleNewCalculation}
          className="bg-primary hover:bg-primary/90"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Nova Cálculo
        </Button>
      </div>

      <Tabs defaultValue="calculations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculations">Cálculos</TabsTrigger>
          <TabsTrigger value="newCalculation">Novo Cálculo</TabsTrigger>
        </TabsList>

        <TabsContent value="calculations" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cálculos..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="w-full sm:w-[200px]">
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="Renewable">Renovável</SelectItem>
                  <SelectItem value="Non-Renewable">Não Renovável</SelectItem>
                  <SelectItem value="Service">Serviço</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredCalculations.length > 0 ? (
              filteredCalculations.map((calc) => (
                <Card
                  key={calc.id}
                  className={`hover:bg-accent/50 cursor-pointer transition-colors ${
                    selectedCalculation === calc.id
                      ? "border-primary"
                      : ""
                  }`}
                  onClick={() => handleCalculationSelect(calc.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{calc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span>
                            Data:{" "}
                            {new Date(calc.date).toLocaleDateString("pt-BR")}
                          </span>
                          <span>•</span>
                          <span>
                            Tipo:{" "}
                            {calc.type === "Renewable"
                              ? "Renovável"
                              : calc.type === "Non-Renewable"
                              ? "Não Renovável"
                              : "Serviço"}
                          </span>
                          <span>•</span>
                          <span>Entradas: {calc.inputs}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        <span className="text-xl font-bold">
                          {calc.emergiaValue.toLocaleString("pt-BR")} EM
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            calc.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {calc.status === "completed"
                            ? "Concluído"
                            : "Em andamento"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Calculator className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg">
                  Nenhum cálculo encontrado
                </h3>
                <p className="text-muted-foreground mt-1">
                  Tente ajustar seus filtros ou crie um novo cálculo.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="newCalculation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Cálculo</CardTitle>
              <CardDescription>
                Insira os detalhes para seu novo cálculo de emergia.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="calculation-name">Nome do Cálculo</Label>
                  <Input
                    id="calculation-name"
                    placeholder="ex: Produção de Painel Solar"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="calculation-type">Tipo de Cálculo</Label>
                  <Select>
                    <SelectTrigger id="calculation-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="renewable">Renovável</SelectItem>
                      <SelectItem value="non-renewable">
                        Não Renovável
                      </SelectItem>
                      <SelectItem value="service">Serviço</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="data-source">Fonte dos Dados</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger id="data-source">
                        <SelectValue placeholder="Selecione a fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="import">Dados Importados</SelectItem>
                        <SelectItem value="manual">Entrada Manual</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="flex-shrink-0">
                      <FileInput className="h-4 w-4 mr-2" />
                      Procurar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-primary hover:bg-primary/90">
                Iniciar Cálculo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parâmetros do Cálculo</CardTitle>
              <CardDescription>
                Configure parâmetros avançados para seu cálculo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="transformity">Transformidade</Label>
                  <Input
                    id="transformity"
                    type="number"
                    placeholder="Informe o valor da transformidade"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="unit">Unidade de Medida</Label>
                  <Select>
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sej">
                        Emjoules Solares (sej)
                      </SelectItem>
                      <SelectItem value="j">Joules (J)</SelectItem>
                      <SelectItem value="g">Gramas (g)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="calculation-method">Método de Cálculo</Label>
                  <Select>
                    <SelectTrigger id="calculation-method">
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Padrão</SelectItem>
                      <SelectItem value="advanced">Avançado</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalculatePage;
