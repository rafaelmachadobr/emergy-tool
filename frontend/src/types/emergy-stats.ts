type DailyTrends = {
  [date: string]: number;
};

type EmergyDistributionPercent = {
  "Fontes Não Renováveis (F)": number;
  "Fontes Renováveis (R)": number;
  "Emissões Ambientais (N)": number;
};

export type EmergyStats = {
  total_calculations: number;
  total_files_imported: number;
  total_emergy_Y: number;
  average_efficiency: number;
  daily_trends: DailyTrends;
  emergy_distribution_percent: EmergyDistributionPercent;
};
