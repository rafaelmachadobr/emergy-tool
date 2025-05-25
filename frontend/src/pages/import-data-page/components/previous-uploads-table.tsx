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
  const { data: matrices } = useGetMatrices();

  console.log("Matrices", matrices);

  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Arquivo</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Quantidade de Linhas</TableHead>
          <TableHead>Data de Upload</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matrices?.map((matrix) => (
          <TableRow key={matrix.id}>
            <TableCell className="font-medium">{matrix.name}</TableCell>
            <TableCell>
              {matrix.name.substring(matrix.name.indexOf(".") + 1)}
            </TableCell>
            <TableCell>{matrix.cells.length} linhas</TableCell>
            <TableCell>
              {new Date(matrix.uploaded_at)
                .toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
                .replace(", ", " ")}
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
