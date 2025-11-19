// Script to generate valid Sudoku patterns using correct ID mapping

const row_1_ids = [1, 4, 7, 10, 13, 16, 19, 22, 25];
const row_2_ids = [2, 5, 8, 11, 14, 17, 20, 23, 26];
const row_3_ids = [3, 6, 9, 12, 15, 18, 21, 24, 27];
const row_4_ids = [28, 31, 34, 37, 40, 43, 46, 49, 52];
const row_5_ids = [29, 32, 35, 38, 41, 44, 47, 50, 53];
const row_6_ids = [30, 33, 36, 39, 42, 45, 48, 51, 54];
const row_7_ids = [55, 58, 61, 64, 67, 70, 73, 76, 79];
const row_8_ids = [56, 59, 62, 65, 68, 71, 74, 77, 80];
const row_9_ids = [57, 60, 63, 66, 69, 72, 75, 78, 81];

const col_1_ids = [1, 2, 3, 28, 29, 30, 55, 56, 57];
const col_2_ids = [4, 5, 6, 31, 32, 33, 58, 59, 60];
const col_3_ids = [7, 8, 9, 34, 35, 36, 61, 62, 63];
const col_4_ids = [10, 11, 12, 37, 38, 39, 64, 65, 66];
const col_5_ids = [13, 14, 15, 40, 41, 42, 67, 68, 69];
const col_6_ids = [16, 17, 18, 43, 44, 45, 70, 71, 72];
const col_7_ids = [19, 20, 21, 46, 47, 48, 73, 74, 75];
const col_8_ids = [22, 23, 24, 49, 50, 51, 76, 77, 78];
const col_9_ids = [25, 26, 27, 52, 53, 54, 79, 80, 81];

// Create ID to row/col/box mapping
const idToRow = {};
const idToCol = {};
const idToBox = {};

const rowArrays = [row_1_ids, row_2_ids, row_3_ids, row_4_ids, row_5_ids, row_6_ids, row_7_ids, row_8_ids, row_9_ids];
const colArrays = [col_1_ids, col_2_ids, col_3_ids, col_4_ids, col_5_ids, col_6_ids, col_7_ids, col_8_ids, col_9_ids];

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

// Calculate box for each ID (0-8)
for (let id = 1; id <= 81; id++) {
  const row = idToRow[id];
  const col = idToCol[id];
  const boxRow = Math.floor(row / 3);
  const boxCol = Math.floor(col / 3);
  idToBox[id] = boxRow * 3 + boxCol;
}

// Get all IDs in a row/col/box
function getRowIds(row) {
  return rowArrays[row];
}

function getColIds(col) {
  return colArrays[col];
}

function getBoxIds(box) {
  const ids = [];
  for (let id = 1; id <= 81; id++) {
    if (idToBox[id] === box) {
      ids.push(id);
    }
  }
  return ids;
}

// Sudoku solver using backtracking with randomization
function solveSudoku(grid) {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) {
    return true; // Solved
  }

  const [row, col] = emptyCell;
  const ids = getRowIds(row);
  const cellId = ids[col];

  // Create shuffled array of numbers 1-9 for randomization
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Try numbers in random order
  for (let num of numbers) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;

      if (solveSudoku(grid)) {
        return true;
      }

      grid[row][col] = 0; // Backtrack
    }
  }

  return false;
}

function findEmptyCell(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

function isValid(grid, row, col, num) {
  // Check row
  const rowIds = getRowIds(row);
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === num) {
      return false;
    }
  }

  // Check column
  const colIds = getColIds(col);
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === num) {
      return false;
    }
  }

  // Check box
  const box = idToBox[rowIds[col]];
  const boxIds = getBoxIds(box);
  for (const id of boxIds) {
    const r = idToRow[id];
    const c = idToCol[id];
    if (grid[r][c] === num) {
      return false;
    }
  }

  return true;
}

// Generate a valid Sudoku solution
function generateValidSudoku() {
  const grid = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

  // Fill with a random valid solution
  solveSudoku(grid);

  // Convert grid to pattern format
  const pattern = [];
  for (let colIdx = 0; colIdx < 9; colIdx++) {
    const colObj = {};
    const colKey = `col_${colIdx + 1}`;
    colObj[colKey] = [];

    const colIds = getColIds(colIdx);
    for (const id of colIds) {
      const row = idToRow[id];
      const col = idToCol[id];
      colObj[colKey].push({
        id: id,
        val: grid[row][col],
      });
    }

    pattern.push(colObj);
  }

  return pattern;
}

// Generate multiple patterns
function generatePatterns(count) {
  const patterns = [];
  for (let i = 0; i < count; i++) {
    patterns.push(generateValidSudoku());
  }
  return patterns;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateValidSudoku, generatePatterns, idToRow, idToCol, idToBox };
}

// If run directly, generate patterns
if (require.main === module) {
  console.log('Generating valid Sudoku patterns...');
  const patterns = generatePatterns(18);
  
  // Format as TypeScript exports
  const patternNames = [
    'easyPattern1', 'easyPattern2', 'easyPattern3',
    'mediumPattern1', 'mediumPattern2', 'mediumPattern3',
    'hardPattern1', 'hardPattern2', 'hardPattern3',
    'expertPattern1', 'expertPattern2', 'expertPattern3',
    'masterPattern1', 'masterPattern2', 'masterPattern3',
    'extremePattern1', 'extremePattern2', 'extremePattern3',
  ];

  console.log('\n// Generated valid Sudoku patterns\n');
  patterns.forEach((pattern, idx) => {
    console.log(`export const ${patternNames[idx]} = ${JSON.stringify(pattern, null, 2)};`);
    console.log('');
  });
}

