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
