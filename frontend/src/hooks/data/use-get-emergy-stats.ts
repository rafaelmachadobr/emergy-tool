import { useQuery } from "@tanstack/react-query";

import { emergyStatsQueryKeys } from "@/keys/queries";
import { api } from "@/lib/axios";
import { EmergyStats } from "@/types/emergy-stats";

export const useGetEmergyStats = () => {
  return useQuery({
    queryKey: emergyStatsQueryKeys.getAll(),
    queryFn: async () => {
      const { data: emergyStats } = await api.get<EmergyStats>(
        "/emergy/stats/"
      );
      return emergyStats;
    },
  });
};
