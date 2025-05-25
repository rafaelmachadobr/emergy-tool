import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreviousUploadsTabContent } from "./components/previous-uploads-tab-content";
import { UploadTabContent } from "./components/upload-tab-content";

const ImportDataPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Importar Dados</h1>
        <p className="text-muted-foreground mt-2">
          Faça upload dos seus arquivos de dados para o cálculo de emergia.
        </p>
      </div>

      <Tabs defaultValue="upload">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upload">Enviar Novos Arquivos</TabsTrigger>
          <TabsTrigger value="previous">Uploads Anteriores</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <UploadTabContent />
        </TabsContent>

        <TabsContent value="previous">
          <PreviousUploadsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportDataPage;
