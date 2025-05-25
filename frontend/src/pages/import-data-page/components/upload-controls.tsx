import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useAddMatrix } from "@/hooks/data/use-add-matrix";
import { FilePlus2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

type UploadControlsProps = {
  files: File[];
  isUploading: boolean;
  setFiles: (files: File[]) => void;
  setFilePreview: (filePreview: string | null) => void;
  setIsUploading: (isUploading: boolean) => void;
};

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

export const UploadControls = ({
  files,
  isUploading,
  setFiles,
  setFilePreview,
  setIsUploading,
}: UploadControlsProps) => {
  const { mutateAsync: addMatrix } = useAddMatrix();

  const navigate = useNavigate();

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validation = importDataSchema.safeParse({
      files,
    });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsUploading(true);

    try {
      await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();

          formData.append("name", file.name);
          formData.append("file", file);

          console.log("Form data:", {
            name: file.name,
            file: file,
          });

          await addMatrix(formData);
        })
      );

      toast.success("Todos os arquivos foram enviados com sucesso.");

      setFiles([]);
      setFilePreview(null);
      navigate("/calculate");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error("Erro ao enviar arquivos: " + error.message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setFiles([]);
    setFilePreview(null);
    toast.info("Envio cancelado.");
  };

  return (
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
  );
};
