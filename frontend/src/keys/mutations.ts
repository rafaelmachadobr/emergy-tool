export const matrixMutationKeys = {
  add: () => ["add-matrix"],
  update: (matrixId) => ["update-matrix", matrixId],
  delete: (matrixId) => ["delete-matrix", matrixId],
};
