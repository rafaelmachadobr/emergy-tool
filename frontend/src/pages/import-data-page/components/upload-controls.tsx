import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { FilePlus2 } from "lucide-react";

type UploadControlsProps = {
  files: File[];
  isUploading: boolean;
  onCancel: () => void;
  onUpload: () => void;
};

export const UploadControls = ({
  files,
  isUploading,
  onCancel,
  onUpload,
}: UploadControlsProps) => {
    return (
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={files.length === 0 || isUploading}
        >
          Cancelar
        </Button>
        <Button
          onClick={onUpload}
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
    );
}
