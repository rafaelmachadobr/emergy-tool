export type Matrix = {
  id: number;
  name: string;
  uploaded_at: string;
  cells: MatrixCell[];
};

export type MatrixCell = {
  id: number;
  row: number;
  column: number;
  value: number;
};
