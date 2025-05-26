export type EmergyCalculationResults = {
  unit: string;
  F: number;
  R: number;
  N: number;
  Y: number;
  EYR: number;
  ELR: number;
  total_transformity: number;
};

export type EmergyCalculation = {
  id: number;
  matrix: number;
  scale_config: number;
  useful_product: number;
  results: EmergyCalculationResults;
  created_at: string;
};
