import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileData } from "@/types/file-data";
import { PreviousUploadsTable } from "./previous-uploads-table";

const files: FileData[] = [
  {
    id: 1,
    name: "energy_flows_2023.csv",
    type: "csv",
    size: 1240000,
    uploadedAt: new Date("2023-12-10"),
  },
  {
    id: 2,
    name: "resource_data.csv",
    type: "csv",
    size: 823000,
    uploadedAt: new Date("2023-12-15"),
  },
  {
    id: 3,
    name: "emissions_data.csv",
    type: "csv",
    size: 652000,
    uploadedAt: new Date("2024-01-05"),
  },
];

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
        <PreviousUploadsTable files={files} />
      </CardContent>
    </Card>
  );
};
