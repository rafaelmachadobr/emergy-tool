import { useQuery } from "@tanstack/react-query";

import { configQueryKeys } from "@/keys/queries";
import { api } from "@/lib/axios";
import { Config } from "@/types/config";

export const useGetConfigs = () => {
  return useQuery({
    queryKey: configQueryKeys.getAll(),
    queryFn: async () => {
      const { data: configs } = await api.get<Config[]>("/scale/config/");
      return configs;
    },
  });
};
