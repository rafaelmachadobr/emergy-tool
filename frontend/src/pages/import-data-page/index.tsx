import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileData } from "@/types/file-data";
import { AlertCircle, FilePlus2, FileType2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FilePreview } from "./components/file-preview";
import { FileUploadArea } from "./components/file-upload-area";

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

const ImportDataPage = () => {
  const [files, setFiles] = useState<File[]>([]);
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

    // Generate preview for the first file if it's a text file
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
    if (files.length === 0) {
      toast.error("Please select files to upload.");

      return;
    }

    setIsUploading(true);
    // Simulate an upload process
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Files uploaded successfully.");

      // Reset the form
      setFiles([]);
      setFilePreview(null);

      // Navigate to the calculation page
      navigate("/calculate");
    }, 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
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
            <CardContent>
              <FileUploadArea
                files={files}
                dragActive={dragActive}
                handleDrag={handleDrag}
                handleDrop={handleDrop}
                handleChange={handleChange}
              />

              {files.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Arquivos Selecionados</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-muted mr-3">
                            <FileType2 className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newFiles = [...files];
                            newFiles.splice(index, 1);
                            setFiles(newFiles);
                            if (newFiles.length === 0) {
                              setFilePreview(null);
                            }
                          }}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filePreview && <FilePreview filePreview={filePreview} />}

              {files.length > 0 && (
                <Alert className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Os arquivos serão processados de acordo com a metodologia de
                    cálculo de emergia SCALE. Certifique-se de que seus dados
                    estejam formatados corretamente.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate("/")}>
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
                className="bg-scale-primary hover:bg-scale-primary/90"
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

          <Card>
            <CardHeader>
              <CardTitle>Diretrizes de Formato de Dados</CardTitle>
              <CardDescription>
                Siga estas diretrizes para garantir que seus dados sejam
                processados corretamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Formato CSV</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Os cabeçalhos devem incluir: 'resource_name', 'quantity',
                    'unit', 'transformity', 'type'
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Arquivo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Data de Upload</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPreviousFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>{file.type.toUpperCase()}</TableCell>
                      <TableCell>{formatFileSize(file.size)}</TableCell>
                      <TableCell>
                        {file.uploadedAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate("/calculate")}
                        >
                          Usar Este Arquivo
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportDataPage;
