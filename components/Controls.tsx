import React from 'react';
import { Difficulty } from '../types';
import { DIFFICULTIES, EMOJIS } from '../constants';

interface ControlsProps {
  currentDifficulty: Difficulty;
  onDifficultyChange: (diff: Difficulty) => void;
  isFlagMode: boolean;
  toggleFlagMode: () => void;
  resetGame: () => void;
  minesLeft: number;
  timer: number;
}

const Controls: React.FC<ControlsProps> = ({
  currentDifficulty,
  onDifficultyChange,
  isFlagMode,
  toggleFlagMode,
  resetGame,
  minesLeft,
  timer
}) => {
  const formattedMines = Math.max(-99, Math.min(minesLeft, 999)).toString();
  const formattedTime = Math.min(timer, 999).toString().padStart(3, '0');

  // Switch emoji to vomit if count is negative (too many flags)
  const minesEmoji = minesLeft < 0 ? EMOJIS.VOMIT : EMOJIS.MINE;

  return (
    <div className="w-full max-w-fit mx-auto bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/60 flex flex-col md:flex-row items-center gap-4 md:gap-8 transition-all hover:shadow-2xl hover:bg-white/90">
      
      {/* Group 1: Difficulty */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
        {/* Difficulty Segmented Control */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50">
          {Object.values(DIFFICULTIES).map((diff) => (
            <button
              key={diff.name}
              onClick={() => onDifficultyChange(diff)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                currentDifficulty.name === diff.name
                  ? 'bg-white text-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.05)]'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              {diff.name}
            </button>
          ))}
        </div>
      </div>

      {/* Group 2: Stats & Actions */}
      <div className="flex items-center justify-between w-full md:w-auto gap-4 sm:gap-8">
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-slate-600 font-mono font-bold text-lg mx-auto md:mx-0">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-sm transition-colors duration-300">
            <span className="text-xl leading-none filter drop-shadow-sm transition-transform duration-300 key={minesEmoji}">
              {minesEmoji}
            </span>
            <span className={`text-slate-700 ${minesLeft < 0 ? 'text-orange-600' : ''}`}>
              {formattedMines}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-sm">
            <span className="text-xl leading-none filter drop-shadow-sm">⏱️</span>
            <span className="text-slate-700">{formattedTime}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

        {/* Actions */}
        <div className="flex items-center gap-3">
           {/* Flag Toggle (Mobile) */}
           <button
              onClick={toggleFlagMode}
              className={`p-2.5 rounded-xl transition-all md:hidden border shadow-sm ${
                isFlagMode 
                  ? 'bg-blue-50 border-blue-200 text-blue-600' 
                  : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
              }`}
              title="切换标记模式"
            >
              <span className="text-xl leading-none">{EMOJIS.FLAG}</span>
            </button>

            {/* Reset Button */}
            <button 
              onClick={resetGame}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95 active:shadow-sm whitespace-nowrap tracking-wide"
            >
              重开
            </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;