import React, { useRef, useEffect } from 'react';
import { BoardData, GameStatus } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: BoardData;
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (e: React.MouseEvent, row: number, col: number) => void;
  gameStatus: GameStatus;
  isFlagMode: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

const Board: React.FC<BoardProps> = ({ 
  board, 
  onCellClick, 
  onCellRightClick, 
  gameStatus, 
  isFlagMode,
  onMouseDown,
  onMouseUp
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  // Prevent default context menu on the whole board
  useEffect(() => {
    const ref = boardRef.current;
    if (!ref) return;
    
    const preventContext = (e: MouseEvent) => e.preventDefault();
    ref.addEventListener('contextmenu', preventContext);
    return () => ref.removeEventListener('contextmenu', preventContext);
  }, []);

  return (
    <div 
      ref={boardRef}
      className="inline-block select-none no-context-menu"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchEnd={onMouseUp}
    >
      <div 
        className="grid gap-0"
        style={{ 
          gridTemplateColumns: `repeat(${board[0]?.length || 0}, min-content)` 
        }}
      >
        {board.map((row, rIndex) => (
          row.map((cell, cIndex) => (
            <Cell
              key={`${rIndex}-${cIndex}`}
              data={cell}
              onClick={() => onCellClick(rIndex, cIndex)}
              onRightClick={(e) => onCellRightClick(e, rIndex, cIndex)}
              gameStatus={gameStatus}
              isFlagMode={isFlagMode}
            />
          ))
        ))}
      </div>
    </div>
  );
};

export default Board;