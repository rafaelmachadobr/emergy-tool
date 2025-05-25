import { useQuery } from "@tanstack/react-query";

import { emergyCalculationQueryKeys } from "@/keys/queries";
import { api } from "@/lib/axios";
import { EmergyCalculation } from "@/types/emergy-calculation";

export const useGetEmergyCalculations = () => {
  return useQuery({
    queryKey: emergyCalculationQueryKeys.getAll(),
    queryFn: async () => {
      const { data: emergyCalculations } = await api.get<EmergyCalculation[]>(
        "/scale/emergy/calculations/"
      );
      return emergyCalculations;
    },
  });
};
