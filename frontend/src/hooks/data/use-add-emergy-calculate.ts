import { matrixMutationKeys } from "@/keys/mutations";
import { matrixQueryKeys } from "@/keys/queries";
import { api } from "@/lib/axios";
import { EmergyCalculationResults } from "@/types/emergy-calculation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type CalculationPayload = {
  matrix_id: number;
  scale_config_id: number;
  useful_product: number;
};

export const useAddEmergyCalculate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: matrixMutationKeys.add(),
    mutationFn: async (payload: CalculationPayload) => {
      const { data } = await api.post<EmergyCalculationResults>(
        "/scale/emergy/calculate/",
        payload
      );
      return data;
    },
    onSuccess: (createdMatrix) => {
      queryClient.setQueryData<EmergyCalculationResults[]>(
        matrixQueryKeys.getAll(),
        (oldMatrices = []) => [...oldMatrices, createdMatrix]
      );
    },
  });
};
