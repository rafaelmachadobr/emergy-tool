import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { CalculationsTabContent } from "./components/calculations-tab-content";
import { NewCalculationTabContent } from "./components/new-calculation-tab-content";

const CalculatePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calcular</h1>
          <p className="text-muted-foreground">
            Processe seus dados para calcular valores de emergia.
          </p>
        </div>
      </div>

      <Tabs defaultValue="newCalculation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="newCalculation">Novo Cálculo</TabsTrigger>
          <TabsTrigger value="calculations">Cálculos Realizados</TabsTrigger>
        </TabsList>

        <TabsContent value="newCalculation" className="space-y-6">
          <NewCalculationTabContent />
        </TabsContent>

        <TabsContent value="calculations" className="space-y-4">
          <CalculationsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalculatePage;
