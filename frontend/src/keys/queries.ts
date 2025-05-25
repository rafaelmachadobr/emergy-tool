export const matrixQueryKeys = {
  getAll: () => ["matrices"],
  getOne: (matrixId: number) => ["matrix", matrixId],
};

export const emergyCalculationQueryKeys = {
  getAll: () => ["emergy-calculations"],
  getOne: (id: number) => ["emergy-calculation", id],
};
