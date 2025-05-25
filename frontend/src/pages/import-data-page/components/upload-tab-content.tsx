import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FilePreview } from "./file-preview";
import { FileUploadArea } from "./file-upload-area";
import { FormatGuidelinesCard } from "./format-guidelines-card";
import { MatrixNameInput } from "./matrix-name-input";
import { SelectedFilesList } from "./selected-files-list";
import { UploadAlert } from "./upload-alert";
import { UploadControls } from "./upload-controls";

type UploadTabContentProps = {
  matrixName: string | null;
  setMatrixName: (name: string | null) => void;
  files: File[];
  filePreview: string | null;
  dragActive: boolean;
  handleDrag: (event: React.DragEvent) => void;
  handleDrop: (event: React.DragEvent) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  handleCancel: () => void;
  handleUpload: () => void;
  isUploading: boolean;
};

export const UploadTabContent = ({
  matrixName,
  setMatrixName,
  files,
  filePreview,
  dragActive,
  handleDrag,
  handleDrop,
  handleChange,
  removeFile,
  handleCancel,
  handleUpload,
  isUploading,
}: UploadTabContentProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Enviar Arquivos</CardTitle>
          <CardDescription>Formatos suportados: CSV.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <MatrixNameInput
            matrixName={matrixName}
            setMatrixName={setMatrixName}
          />
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
