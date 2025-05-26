export const matrixQueryKeys = {
  getAll: () => ["matrices"],
  getOne: (matrixId: number) => ["matrix", matrixId],
};

export const emergyCalculationQueryKeys = {
  getAll: () => ["emergy-calculations"],
  getOne: (id: number) => ["emergy-calculation", id],
};

export const configQueryKeys = {
  getAll: () => ["configs"],
  getOne: (id: number) => ["config", id],
};

export const emergyStatsQueryKeys = {
  getAll: () => ["emergy-stats"],
  getOne: (id: number) => ["emergy-stat", id],
};
