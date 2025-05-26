import { useMutation, useQueryClient } from "@tanstack/react-query";

import { configMutationKeys } from "@/keys/mutations";
import { configQueryKeys } from "@/keys/queries";
import { api } from "@/lib/axios";
import { ConfigInput } from "@/types/config";

export const useAddConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: configMutationKeys.add(),
    mutationFn: async (payload: ConfigInput) => {
      const { data } = await api.post<ConfigInput>("/scale/config/", payload);
      return data;
    },
    onSuccess: (createdConfig) => {
      queryClient.setQueryData<ConfigInput[]>(
        configQueryKeys.getAll(),
        (oldConfigs = []) => [...oldConfigs, createdConfig]
      );
    },
  });
};
