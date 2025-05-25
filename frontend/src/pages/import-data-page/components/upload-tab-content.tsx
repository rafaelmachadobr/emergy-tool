import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { FilePreview } from "./file-preview";
import { FileUploadArea } from "./file-upload-area";
import { FormatGuidelinesCard } from "./format-guidelines-card";
import { SelectedFilesList } from "./selected-files-list";
import { TemplateDownloadCard } from "./template-download-card";
import { UploadAlert } from "./upload-alert";
import { UploadControls } from "./upload-controls";

export const UploadTabContent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (newFiles.length === 0) setFilePreview(null);
  };

  return (
    <>
      <TemplateDownloadCard />

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
          setFiles={setFiles}
          setFilePreview={setFilePreview}
          setIsUploading={setIsUploading}
        />
      </Card>

      <FormatGuidelinesCard />
    </>
  );
};
