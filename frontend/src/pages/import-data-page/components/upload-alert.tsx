import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const UploadAlert = () => {
  return (
    <Alert className="mt-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Os arquivos serão processados de acordo com a metodologia de cálculo de
        emergia SCALE. Certifique-se de que seus dados estejam formatados
        corretamente.
      </AlertDescription>
    </Alert>
  );
}
