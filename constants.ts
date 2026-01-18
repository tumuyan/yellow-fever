import { Difficulty } from './types';

export const DIFFICULTIES: Record<string, Difficulty> = {
  BEGINNER: { name: '初级', rows: 9, cols: 9, mines: 10 },
  INTERMEDIATE: { name: '中级', rows: 16, cols: 16, mines: 40 },
  EXPERT: { name: '高级', rows: 16, cols: 30, mines: 99 },
};

export const EMOJIS = {
  MINE: '😅',
  FLAG: '🩶',
  EXPLOSION: '💥', 
  HAPPY: '😎',
  WORRIED: '😓', // Mouse down on cell
  NORMAL: '🙂',
  DEAD: '😵',
  VOMIT: '🤮',
};

export const NUMBER_COLORS = [
  '', // 0
  'text-blue-500', // 1
  'text-green-500', // 2
  'text-red-500', // 3
  'text-purple-700', // 4
  'text-amber-600', // 5
  'text-cyan-600', // 6
  'text-black', // 7
  'text-gray-500', // 8
];