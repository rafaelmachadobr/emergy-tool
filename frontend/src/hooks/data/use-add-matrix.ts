import { useMutation, useQueryClient } from "@tanstack/react-query";

import { matrixMutationKeys } from "@/keys/mutations";
import { matrixQueryKeys } from "@/keys/queries";
import { api } from "@/lib/axios";
import { Matrix } from "@/types/matrix";

export interface AddMatrixInput {
  name: string;
  file: File;
}

export const useAddMatrix = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: matrixMutationKeys.add(),
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post<Matrix>("/lci/upload/", formData);
      return data;
    },
    onSuccess: (createdMatrix) => {
      queryClient.setQueryData<Matrix[]>(
        matrixQueryKeys.getAll(),
        (oldMatrices = []) => [...oldMatrices, createdMatrix]
      );
    },
  });
};
