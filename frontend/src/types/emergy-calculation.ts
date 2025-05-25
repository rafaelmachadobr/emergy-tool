export type EmergyCalculation = {
  id: number;
  matrix: number;
  scale_config: number;
  useful_product: number;
  results: {
    unit: string;
    F: number;
    R: number;
    N: number;
    Y: number;
    EYR: number;
    ELR: number;
    total_transformity: number;
  };
  created_at: string;
};
