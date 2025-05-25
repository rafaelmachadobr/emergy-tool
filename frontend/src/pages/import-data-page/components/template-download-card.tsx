import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "sonner";

export const TemplateDownloadCard = () => {
  const downloadTemplate = () => {
    const csvContent = [
      "Processo;Fertilizante (kg);Água (L);Combustível (L);Emissões N2O (kg)",
      "Plantio;0.5;1000;1.2;0.01",
      "Irrigação;0;3000;0;0",
      "Colheita;0;500;0.8;0.005",
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modelo_dados_emergia.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success("Modelo baixado com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Baixar Modelo</CardTitle>
        <CardDescription>
          Baixe um arquivo CSV modelo com o formato correto para os dados de
          emergia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Modelo CSV</h4>
            <p className="text-sm text-muted-foreground">
              Inclui dados de exemplo com os nomes de colunas e formato corretos
            </p>
          </div>
          <Button variant="outline" onClick={downloadTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Baixar modelo CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
