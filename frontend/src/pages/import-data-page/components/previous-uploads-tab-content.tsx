import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PreviousUploadsTable } from "./previous-uploads-table";

export const PreviousUploadsTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploads Anteriores</CardTitle>
        <CardDescription>
          Arquivos que você enviou anteriormente para o cálculo de emergia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PreviousUploadsTable  />
      </CardContent>
    </Card>
  );
};
