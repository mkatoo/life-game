export const nextGeneration = (grid: boolean[][]): boolean[][] => {
  const rows = grid.length;
  const cols = grid[0].length;
  const newGrid = Array(rows).fill(null).map(() => Array(cols).fill(false));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = countNeighbors(grid, row, col);
      const isAlive = grid[row][col];

      if (isAlive) {
        // Rule 1: Any live cell with fewer than two live neighbors dies (underpopulation)
        // Rule 2: Any live cell with two or three live neighbors lives on to the next generation
        // Rule 3: Any live cell with more than three live neighbors dies (overpopulation)
        newGrid[row][col] = neighbors === 2 || neighbors === 3;
      } else {
        // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
        newGrid[row][col] = neighbors === 3;
      }
    }
  }

  return newGrid;
};

export const countNeighbors = (grid: boolean[][], row: number, col: number): number => {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  // Check all 8 neighbors
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the cell itself
      
      const newRow = row + i;
      const newCol = col + j;
      
      // Check bounds
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        if (grid[newRow][newCol]) {
          count++;
        }
      }
    }
  }

  return count;
};