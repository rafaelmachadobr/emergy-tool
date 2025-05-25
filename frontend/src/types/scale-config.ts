export type ScaleConfig = {
  name: string;
  config: {
    unit: string;
    transformities: {
      [key: string]: {
        type: string;
        transformity: number;
      };
    };
  };
};
