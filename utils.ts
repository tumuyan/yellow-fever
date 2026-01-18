import { BoardData, CellData, Difficulty } from './types';

export const createEmptyBoard = (rows: number, cols: number): BoardData => {
  const board: BoardData = [];
  for (let r = 0; r < rows; r++) {
    const row: CellData[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        isMine: false,
        status: 'hidden',
        neighborMines: 0,
      });
    }
    board.push(row);
  }
  return board;
};

// Helper to get neighbors
export const getNeighbors = (r: number, c: number, rows: number, cols: number): [number, number][] => {
  const neighbors: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        neighbors.push([nr, nc]);
      }
    }
  }
  return neighbors;
};

export const initializeMines = (
  initialBoard: BoardData,
  difficulty: Difficulty,
  safeRow: number,
  safeCol: number
): BoardData => {
  const { rows, cols, mines } = difficulty;
  const board = JSON.parse(JSON.stringify(initialBoard)) as BoardData;
  
  let minesPlaced = 0;

  // Ensure first click and its neighbors are safe
  const safeZone = new Set<string>();
  safeZone.add(`${safeRow},${safeCol}`);
  const neighbors = getNeighbors(safeRow, safeCol, rows, cols);
  neighbors.forEach(([nr, nc]) => safeZone.add(`${nr},${nc}`));

  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);

    if (!board[r][c].isMine && !safeZone.has(`${r},${c}`)) {
      board[r][c].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate numbers
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      
      let count = 0;
      getNeighbors(r, c, rows, cols).forEach(([nr, nc]) => {
        if (board[nr][nc].isMine) count++;
      });
      board[r][c].neighborMines = count;
    }
  }

  return board;
};

export const revealCellLogic = (
  board: BoardData,
  row: number,
  col: number
): { board: BoardData; exploded: boolean } => {
  const newBoard = [...board.map(r => [...r])]; // Deep copy
  const cell = newBoard[row][col];

  if (cell.status !== 'hidden') return { board: newBoard, exploded: false };

  if (cell.isMine) {
    cell.status = 'revealed';
    return { board: newBoard, exploded: true };
  }

  // Flood fill
  const stack = [[row, col]];
  
  while (stack.length > 0) {
    const [currR, currC] = stack.pop()!;
    const currCell = newBoard[currR][currC];

    if (currCell.status !== 'hidden') continue;
    
    currCell.status = 'revealed';

    if (currCell.neighborMines === 0) {
      const neighbors = getNeighbors(currR, currC, newBoard.length, newBoard[0].length);
      for (const [nr, nc] of neighbors) {
        if (newBoard[nr][nc].status === 'hidden') {
           stack.push([nr, nc]);
        }
      }
    }
  }

  return { board: newBoard, exploded: false };
};
