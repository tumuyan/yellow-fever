export type CellStatus = 'hidden' | 'revealed' | 'flagged';

export interface CellData {
  row: number;
  col: number;
  isMine: boolean;
  status: CellStatus;
  neighborMines: number;
}

export type BoardData = CellData[][];

export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST',
}

export interface Difficulty {
  name: string;
  rows: number;
  cols: number;
  mines: number;
}
