import {
  easyPattern1,
  easyPattern2,
  easyPattern3,
  mediumPattern1,
  mediumPattern2,
  mediumPattern3,
  hardPattern1,
  hardPattern2,
  hardPattern3,
  expertPattern1,
  expertPattern2,
  expertPattern3,
  masterPattern1,
  masterPattern2,
  masterPattern3,
  extremePattern1,
  extremePattern2,
  extremePattern3,
} from "../patterns";
import {
  row_1_ids,
  row_2_ids,
  row_3_ids,
  row_4_ids,
  row_5_ids,
  row_6_ids,
  row_7_ids,
  row_8_ids,
  row_9_ids,
} from "../rows";
import {
  col_1_ids,
  col_2_ids,
  col_3_ids,
  col_4_ids,
  col_5_ids,
  col_6_ids,
  col_7_ids,
  col_8_ids,
  col_9_ids,
} from "../cols";

// Helper function to convert pattern to 9x9 grid using correct ID mapping
function patternToGrid(pattern: any[]): number[][] {
  const grid: number[][] = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

  // Create ID to row/col mapping
  const idToRow: { [key: number]: number } = {};
  const idToCol: { [key: number]: number } = {};

  const rowArrays = [
    row_1_ids,
    row_2_ids,
    row_3_ids,
    row_4_ids,
    row_5_ids,
    row_6_ids,
    row_7_ids,
    row_8_ids,
    row_9_ids,
  ];
  const colArrays = [
    col_1_ids,
    col_2_ids,
    col_3_ids,
    col_4_ids,
    col_5_ids,
    col_6_ids,
    col_7_ids,
    col_8_ids,
    col_9_ids,
  ];

  rowArrays.forEach((row, idx) => {
    row.forEach((id) => {
      idToRow[id] = idx;
    });
  });

  colArrays.forEach((col, idx) => {
    col.forEach((id) => {
      idToCol[id] = idx;
    });
  });

  pattern.forEach((col) => {
    Object.keys(col).forEach((key) => {
      if (key.startsWith("col_")) {
        col[key].forEach((cell: { id: number; val: number }) => {
          const row = idToRow[cell.id];
          const colIdx = idToCol[cell.id];
          if (row !== undefined && colIdx !== undefined) {
            grid[row][colIdx] = cell.val;
          }
        });
      }
    });
  });

  return grid;
}

// Helper function to validate a Sudoku grid
function validateSudokuGrid(grid: number[][]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check rows
  for (let r = 0; r < 9; r++) {
    const seen = new Set<number>();
    for (let c = 0; c < 9; c++) {
      const val = grid[r][c];
      if (val < 1 || val > 9) {
        errors.push(`Row ${r + 1} has invalid value: ${val}`);
        return { isValid: false, errors };
      }
      if (seen.has(val)) {
        errors.push(`Row ${r + 1} has duplicate: ${val}`);
        return { isValid: false, errors };
      }
      seen.add(val);
    }
  }

  // Check columns
  for (let c = 0; c < 9; c++) {
    const seen = new Set<number>();
    for (let r = 0; r < 9; r++) {
      const val = grid[r][c];
      if (seen.has(val)) {
        errors.push(`Column ${c + 1} has duplicate: ${val}`);
        return { isValid: false, errors };
      }
      seen.add(val);
    }
  }

  // Check 3x3 boxes
  for (let box = 0; box < 9; box++) {
    const seen = new Set<number>();
    const startRow = Math.floor(box / 3) * 3;
    const startCol = (box % 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        const val = grid[r][c];
        if (seen.has(val)) {
          errors.push(`Box ${box + 1} (row ${r + 1}, col ${c + 1}) has duplicate: ${val}`);
          return { isValid: false, errors };
        }
        seen.add(val);
      }
    }
  }

  return { isValid: true, errors: [] };
}

// Test all patterns
const allPatterns = [
  { name: "easyPattern1", pattern: easyPattern1 },
  { name: "easyPattern2", pattern: easyPattern2 },
  { name: "easyPattern3", pattern: easyPattern3 },
  { name: "mediumPattern1", pattern: mediumPattern1 },
  { name: "mediumPattern2", pattern: mediumPattern2 },
  { name: "mediumPattern3", pattern: mediumPattern3 },
  { name: "hardPattern1", pattern: hardPattern1 },
  { name: "hardPattern2", pattern: hardPattern2 },
  { name: "hardPattern3", pattern: hardPattern3 },
  { name: "expertPattern1", pattern: expertPattern1 },
  { name: "expertPattern2", pattern: expertPattern2 },
  { name: "expertPattern3", pattern: expertPattern3 },
  { name: "masterPattern1", pattern: masterPattern1 },
  { name: "masterPattern2", pattern: masterPattern2 },
  { name: "masterPattern3", pattern: masterPattern3 },
  { name: "extremePattern1", pattern: extremePattern1 },
  { name: "extremePattern2", pattern: extremePattern2 },
  { name: "extremePattern3", pattern: extremePattern3 },
];

describe("Sudoku Pattern Validation", () => {
  allPatterns.forEach(({ name, pattern }) => {
    test(`${name} should be a valid Sudoku solution (no duplicates in rows, columns, or boxes)`, () => {
      const grid = patternToGrid(pattern);
      const validation = validateSudokuGrid(grid);

      if (!validation.isValid) {
        console.error(`\n❌ Validation failed for ${name}:`);
        validation.errors.forEach((error) => {
          console.error(`   - ${error}`);
        });
        console.error(`\nGrid representation for ${name}:`);
        console.table(grid);
      }

      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test(`${name} should have all 81 cells filled`, () => {
      const grid = patternToGrid(pattern);
      let filledCount = 0;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (grid[r][c] >= 1 && grid[r][c] <= 9) {
            filledCount++;
          }
        }
      }
      expect(filledCount).toBe(81);
    });

    test(`${name} should have values only between 1-9`, () => {
      const grid = patternToGrid(pattern);
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          expect(grid[r][c]).toBeGreaterThanOrEqual(1);
          expect(grid[r][c]).toBeLessThanOrEqual(9);
        }
      }
    });
  });
});

