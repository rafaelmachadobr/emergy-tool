import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { PreviousUploadsTabContent } from "./components/previous-uploads-tab-content";
import { UploadTabContent } from "./components/upload-tab-content";

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
          <UploadTabContent
            matrixName={matrixName}
            setMatrixName={setMatrixName}
            files={files}
            filePreview={filePreview}
            dragActive={dragActive}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            handleChange={handleChange}
            removeFile={removeFile}
            handleCancel={handleCancel}
            handleUpload={handleUpload}
            isUploading={isUploading}
          />
        </TabsContent>

        <TabsContent value="previous">
          <PreviousUploadsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportDataPage;
