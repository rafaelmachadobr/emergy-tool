import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MatrixNameInputProps = {
  matrixName: string | null;
  setMatrixName: (name: string | null) => void;
};

export const MatrixNameInput = ({
  matrixName,
  setMatrixName,
}: MatrixNameInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="matrix-name">Nome da Matriz</Label>
      <Input
        id="matrix-name"
        type="text"
        placeholder="Digite o nome da matriz"
        value={matrixName || ""}
        onChange={(e) => setMatrixName(e.target.value)}
        className="w-full"
      />
    </div>
  );
};
