import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { FilePreview } from "./file-preview";
import { FileUploadArea } from "./file-upload-area";
import { FormatGuidelinesCard } from "./format-guidelines-card";
import { SelectedFilesList } from "./selected-files-list";
import { UploadAlert } from "./upload-alert";
import { UploadControls } from "./upload-controls";

const importDataSchema = z.object({
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

export const UploadTabContent = () => {
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
      files,
    });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsUploading(true);
    console.log("Upload data:", {
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
    toast.info("Envio cancelado.");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Enviar Arquivos</CardTitle>
          <CardDescription>Formatos suportados: CSV.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
        <UploadControls
          files={files}
          isUploading={isUploading}
          onCancel={handleCancel}
          onUpload={handleUpload}
        />
      </Card>

      <FormatGuidelinesCard />
    </>
  );
};
