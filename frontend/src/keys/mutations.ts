export const matrixMutationKeys = {
  add: () => ["add-matrix"],
  update: (matrixId: number) => ["update-matrix", matrixId],
  delete: (matrixId: number) => ["delete-matrix", matrixId],
};

export const emergyCalculationMutationKeys = {
  add: () => ["add-emergy-calculation"],
  update: (id: number) => ["update-emergy-calculation", id],
  delete: (id: number) => ["delete-emergy-calculation", id],
};

export const configMutationKeys = {
  add: () => ["add-config"],
  update: (id: number) => ["update-config", id],
  delete: (id: number) => ["delete-config", id],
};

export const emergyStatsMutationKeys = {
  add: () => ["add-emergy-stat"],
  update: (id: number) => ["update-emergy-stat", id],
  delete: (id: number) => ["delete-emergy-stat", id],
};
