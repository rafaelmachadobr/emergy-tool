import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Search } from "lucide-react";
import React, { useState } from "react";

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

export const CalculationsTabContent: React.FC = () => {
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

  const filteredCalculations = calculations.filter((calc) => {
    const matchesSearch = calc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "" || calc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <>
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
                selectedCalculation === calc.id ? "border-primary" : ""
              }`}
              onClick={() => handleCalculationSelect(calc.id)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{calc.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>
                        Data: {new Date(calc.date).toLocaleDateString("pt-BR")}
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
            <h3 className="font-medium text-lg">Nenhum cálculo encontrado</h3>
            <p className="text-muted-foreground mt-1">
              Tente ajustar seus filtros ou crie um novo cálculo.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
