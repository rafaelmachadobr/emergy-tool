import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileUp, Upload } from "lucide-react";

interface FileUploadAreaProps {
  files: File[];
  dragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  files,
  dragActive,
  handleDrag,
  handleDrop,
  handleChange,
}) => (
  <div
    className={`border-2 border-dashed rounded-lg p-10 text-center ${
      dragActive
        ? "border-primary bg-highlight/20"
        : "border-border"
    }`}
    onDragEnter={handleDrag}
    onDragLeave={handleDrag}
    onDragOver={handleDrag}
    onDrop={handleDrop}
  >
    <div className="flex flex-col items-center justify-center gap-4">
      <Upload className="h-10 w-10 text-muted-foreground" />
      <div>
        <p className="text-lg font-medium">
          {files.length > 0
            ? `${files.length} arquivo(s) selecionado(s)`
            : "Arraste e solte arquivos aqui"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ou clique para buscar
        </p>
      </div>
      <Label htmlFor="file-upload" className="sr-only">
        Escolher arquivos
      </Label>
      <input
        id="file-upload"
        type="file"
        multiple
        accept=".csv"
        className="hidden"
        onChange={handleChange}
      />
      <Button
        variant="outline"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <FileUp className="mr-2 h-4 w-4" />
        Buscar Arquivos
      </Button>
    </div>
  </div>
);
