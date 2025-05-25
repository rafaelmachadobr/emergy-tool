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
import { ArrowRight, FileInput } from "lucide-react";

export const NewCalculationTabContent: React.FC = () => {
  return (
    <>
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
                  <SelectItem value="non-renewable">Não Renovável</SelectItem>
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
                  <SelectItem value="sej">Emjoules Solares (sej)</SelectItem>
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
    </>
  );
};
