export interface CellData {
  id: number;
  val: number;
}

export interface PatternColumn {
  col_1?: CellData[];
  col_2?: CellData[];
  col_3?: CellData[];
  col_4?: CellData[];
  col_5?: CellData[];
  col_6?: CellData[];
  col_7?: CellData[];
  col_8?: CellData[];
  col_9?: CellData[];
}

export type Difficulty = "easy" | "medium" | "hard" | "expert" | "master" | "extreme";

export interface DifficultyConfig {
  minCells: number;
  maxCells: number;
  label: string;
}

