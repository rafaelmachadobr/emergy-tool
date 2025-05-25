import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const FormatGuidelinesCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Diretrizes de Formato de Dados</CardTitle>
        <CardDescription>
          Siga estas diretrizes para garantir que seus dados sejam processados
          corretamente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Formato CSV</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Os cabeçalhos devem incluir: 'Processo', 'Fertilizante (kg)',
              'Água (L)', 'Combustível (L)', 'Emissões N2O (kg)'
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
