import { useState, useCallback, useEffect, useRef } from 'react';
import { BoardData, GameStatus, Difficulty } from '../types';
import { DIFFICULTIES } from '../constants';
import { createEmptyBoard, initializeMines, revealCellLogic } from '../utils';

export const useGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES.BEGINNER);
  const [board, setBoard] = useState<BoardData>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [timer, setTimer] = useState(0);
  const [flagsUsed, setFlagsUsed] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize empty board when difficulty changes
  useEffect(() => {
    resetGame(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetGame = useCallback((diff: Difficulty = difficulty) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDifficulty(diff);
    setBoard(createEmptyBoard(diff.rows, diff.cols));
    setGameStatus(GameStatus.IDLE);
    setTimer(0);
    setFlagsUsed(0);
    setIsMouseDown(false);
  }, [difficulty]);

  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING) {
      timerRef.current = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus]);

  const onCellClick = useCallback((row: number, col: number) => {
    if (gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST) return;
    
    let currentBoard = board;
    let currentStatus = gameStatus;

    // First click logic
    if (currentStatus === GameStatus.IDLE) {
      currentBoard = initializeMines(board, difficulty, row, col);
      currentStatus = GameStatus.PLAYING;
      setGameStatus(GameStatus.PLAYING);
    }

    const cell = currentBoard[row][col];
    if (cell.status === 'flagged' || cell.status === 'revealed') return;

    const { board: newBoard, exploded } = revealCellLogic(currentBoard, row, col);
    setBoard(newBoard);

    if (exploded) {
      setGameStatus(GameStatus.LOST);
      // Reveal all mines on loss
      setBoard(prev => prev.map(r => r.map(c => {
        if (c.isMine) return { ...c, status: 'revealed' };
        return c;
      })));
    } else {
      // Check win
      let hiddenNonMines = 0;
      newBoard.forEach(r => r.forEach(c => {
        if (!c.isMine && c.status === 'hidden') hiddenNonMines++;
      }));
      
      if (hiddenNonMines === 0) {
        setGameStatus(GameStatus.WON);
        // Flag all remaining mines
        setBoard(prev => prev.map(r => r.map(c => {
            if (c.isMine) return { ...c, status: 'flagged' };
            return c;
        })));
        setFlagsUsed(difficulty.mines);
      }
    }
  }, [board, difficulty, gameStatus]);

  const onCellRightClick = useCallback((e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameStatus === GameStatus.WON || gameStatus === GameStatus.LOST) return;
    
    // Can't flag before starting. Simplified for this version.
    if (gameStatus === GameStatus.IDLE) return; 

    const cell = board[row][col];
    if (cell.status === 'revealed') return;

    const newBoard = [...board];
    const newCell = { ...newBoard[row][col] };

    if (newCell.status === 'flagged') {
      newCell.status = 'hidden';
      setFlagsUsed(f => f - 1);
    } else {
      newCell.status = 'flagged';
      setFlagsUsed(f => f + 1);
    }
    
    newBoard[row][col] = newCell;
    setBoard(newBoard);
  }, [board, gameStatus]);

  return {
    difficulty,
    board,
    gameStatus,
    timer,
    flagsUsed,
    isMouseDown,
    setIsMouseDown,
    resetGame,
    onCellClick,
    onCellRightClick,
    setDifficulty
  };
};