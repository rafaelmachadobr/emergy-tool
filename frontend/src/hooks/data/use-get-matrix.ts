import { useQuery } from "@tanstack/react-query";

import { matrixQueryKeys } from "@/keys/queries";
import { api } from "@/lib/axios";
import { Matrix } from "@/types/matrix";

type UseGetMatrixProps = {
  matrixId: number;
};

export const useGetMatrix = ({ matrixId }: UseGetMatrixProps) => {
  return useQuery({
    queryKey: matrixQueryKeys.getOne(matrixId),
    queryFn: async () => {
      const { data: matrix } = await api.get<Matrix>(
        `/lci/matrices/${matrixId}`
      );
      return matrix;
    },
  });
};
