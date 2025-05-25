import { useQuery } from "@tanstack/react-query";

import { matrixQueryKeys } from "@/keys/queries";
import { api } from "@/lib/axios";
import { Matrix } from "@/types/matrix";

export const useGetMatrices = () => {
  return useQuery({
    queryKey: matrixQueryKeys.getAll(),
    queryFn: async () => {
      const { data: matrices } = await api.get<Matrix[]>("/lci/matrices");
      return matrices;
    },
  });
};
