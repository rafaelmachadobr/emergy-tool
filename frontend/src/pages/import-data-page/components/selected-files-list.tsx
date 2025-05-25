import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/utils/format-file-size";
import { FileType2 } from "lucide-react";

interface SelectedFilesListProps {
  files: File[];
  removeFile: (index: number) => void;
}

export const SelectedFilesList: React.FC<SelectedFilesListProps> = ({
  files,
  removeFile,
}) => {
  return (
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
            <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
              Remover
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
