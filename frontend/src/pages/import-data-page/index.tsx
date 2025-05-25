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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileData } from "@/types/file-data";
import { FilePlus2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { FilePreview } from "./components/file-preview";
import { FileUploadArea } from "./components/file-upload-area";
import { FormatGuidelinesCard } from "./components/format-guidelines-card";
import { PreviousUploadsTable } from "./components/previous-uploads-table";
import { SelectedFilesList } from "./components/selected-files-list";
import { UploadAlert } from "./components/upload-alert";

const mockPreviousFiles: FileData[] = [
  {
    id: 1,
    name: "energy_flows_2023.csv",
    type: "csv",
    size: 1240000,
    uploadedAt: new Date("2023-12-10"),
  },
  {
    id: 2,
    name: "resource_data.csv",
    type: "csv",
    size: 823000,
    uploadedAt: new Date("2023-12-15"),
  },
  {
    id: 3,
    name: "emissions_data.csv",
    type: "csv",
    size: 652000,
    uploadedAt: new Date("2024-01-05"),
  },
];

const importDataSchema = z.object({
  matrixName: z
    .string()
    .min(3, "O nome da matriz deve ter pelo menos 3 caracteres"),
  files: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.type === "text/csv" || file.name.endsWith(".csv"),
          { message: "Apenas arquivos CSV são permitidos." }
        )
    )
    .min(1, "Selecione pelo menos um arquivo."),
});

const ImportDataPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [matrixName, setMatrixName] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    setFiles(newFiles);

    if (newFiles.length > 0) {
      const file = newFiles[0];
      if (file.type.includes("text") || file.type.includes("csv")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            setFilePreview(
              e.target.result.substring(0, 1000) +
                (e.target.result.length > 1000 ? "..." : "")
            );
          }
        };
        reader.readAsText(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleUpload = () => {
    const validation = importDataSchema.safeParse({
      matrixName: matrixName?.trim() || "",
      files,
    });

    if (!validation.success) {
      // Mostra o primeiro erro encontrado
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsUploading(true);
    console.log("Upload data:", {
      projectName: matrixName?.trim(),
      files: files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    });

    setTimeout(() => {
      setIsUploading(false);
      toast.success("Arquivos enviados com sucesso.");

      setFiles([]);
      setFilePreview(null);
      setMatrixName(null);

      navigate("/calculate");
    }, 2000);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (newFiles.length === 0) setFilePreview(null);
  };

  const handleCancel = () => {
    setFiles([]);
    setFilePreview(null);
    setMatrixName(null);
    toast.info("Envio cancelado.");
  };

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
          <Card>
            <CardHeader>
              <CardTitle>Enviar Arquivos</CardTitle>
              <CardDescription>Formatos suportados: CSV.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="matrix-name">Nome da Matriz</Label>
                <Input
                  id="matrix-name"
                  type="text"
                  placeholder="Digite o nome da matriz"
                  value={matrixName || ""}
                  onChange={(e) => setMatrixName(e.target.value)}
                  className="w-full"
                />
              </div>
              <FileUploadArea
                files={files}
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                handleChange={handleChange}
              />

              {files.length > 0 && (
                <SelectedFilesList files={files} removeFile={removeFile} />
              )}

              {filePreview && <FilePreview filePreview={filePreview} />}

              {files.length > 0 && <UploadAlert />}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={files.length === 0 || isUploading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
                className="bg-primary hover:bg-primary/90"
              >
                {isUploading ? (
                  <>
                    <span className="mr-2 animate-spin">⟳</span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FilePlus2 className="mr-2 h-4 w-4" />
                    Enviar e Processar
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <FormatGuidelinesCard />
        </TabsContent>

        <TabsContent value="previous">
          <Card>
            <CardHeader>
              <CardTitle>Uploads Anteriores</CardTitle>
              <CardDescription>
                Arquivos que você enviou anteriormente para o cálculo de emergia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PreviousUploadsTable files={mockPreviousFiles} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportDataPage;
