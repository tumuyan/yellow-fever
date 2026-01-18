import React from 'react';
import { CellData, GameStatus } from '../types';
import { EMOJIS, NUMBER_COLORS } from '../constants';

interface CellProps {
  data: CellData;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  gameStatus: GameStatus;
  isFlagMode?: boolean; // Mobile support
}

const Cell: React.FC<CellProps> = React.memo(({ data, onClick, onRightClick, gameStatus, isFlagMode }) => {
  const { status, isMine, neighborMines } = data;

  const handleInteraction = (e: React.MouseEvent) => {
    if (e.type === 'contextmenu' || (e.type === 'click' && isFlagMode)) {
      onRightClick(e);
      return;
    }
    onClick();
  };

  const baseClasses = "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer select-none text-base sm:text-xl font-bold transition-all duration-100 rounded-[4px] sm:rounded-md m-[1px]";
  
  // Visual Styles
  let statusClasses = "";
  let content = null;

  if (status === 'revealed') {
    if (isMine) {
      statusClasses = "bg-red-100 shadow-inner";
      content = <span className="text-xl sm:text-2xl filter drop-shadow-sm">{EMOJIS.MINE}</span>;
    } else {
      statusClasses = "bg-[#eef2f6] shadow-inner"; // Very light blue-grey for revealed
      content = neighborMines > 0 ? (
        <span className={`${NUMBER_COLORS[neighborMines]} filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]`}>{neighborMines}</span>
      ) : null;
    }
  } else if (status === 'flagged') {
    // Modern "Raised" button look
    statusClasses = "bg-slate-200 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.7)] hover:bg-slate-100";
    content = <span className="text-sm sm:text-base filter drop-shadow-sm transform scale-110">{EMOJIS.FLAG}</span>;
  } else {
    // Hidden (Standard Raised)
    statusClasses = "bg-slate-300 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.15),inset_2px_2px_4px_rgba(255,255,255,0.8)] hover:bg-slate-200 hover:-translate-y-[1px] active:translate-y-[0px] active:shadow-inner";
  }

  // Handle Game Over specific visuals
  if (gameStatus === GameStatus.LOST && status === 'flagged' && !isMine) {
      statusClasses = "bg-red-50 shadow-inner border border-red-200";
      content = "❌"; 
  }

  return (
    <div
      className={`${baseClasses} ${statusClasses}`}
      onClick={handleInteraction}
      onContextMenu={handleInteraction}
      role="button"
      aria-label={`Cell at ${data.row}, ${data.col}`}
    >
      {content}
    </div>
  );
});

export default Cell;