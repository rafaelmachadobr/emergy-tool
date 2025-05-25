export const matrixMutationKeys = {
  add: () => ["add-matrix"],
  update: (matrixId: number) => ["update-matrix", matrixId],
  delete: (matrixId: number) => ["delete-matrix", matrixId],
};
