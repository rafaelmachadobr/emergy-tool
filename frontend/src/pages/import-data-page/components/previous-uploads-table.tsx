import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMatrices } from "@/hooks/data/use-get-matrices";
import { useNavigate } from "react-router-dom";

export const PreviousUploadsTable: React.FC = () => {
  const { data: matrices, isLoading } = useGetMatrices();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Arquivo</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Quantidade de Células</TableHead>
          <TableHead>Data de Upload</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matrices?.map((matrix) => (
          <TableRow key={matrix.id}>
            <TableCell className="font-medium">{matrix.name || ""}</TableCell>
            <TableCell>
              {matrix.name?.split(".").pop()?.toUpperCase() || ""}
            </TableCell>
            <TableCell>{matrix.cells?.length || 0}</TableCell>
            <TableCell>
              {matrix.uploaded_at
                ? new Date(matrix.uploaded_at).toLocaleString("pt-BR")
                : ""}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/calculate")}
              >
                Usar Este Arquivo
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
