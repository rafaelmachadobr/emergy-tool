export type Config = {
  id: number;
  name: string;
  config: object;
  created_at: string;
};

type TransformityType = "R" | "F" | "N";

type TransformityItem = {
  type: TransformityType;
  transformity: number;
};

type ConfigWithTransformities = {
  unit: string;
  transformities: {
    [key: string]: TransformityItem;
  };
};

export type ConfigInput = {
  name: string;
  config: ConfigWithTransformities;
};
