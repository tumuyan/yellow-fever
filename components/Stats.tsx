import React from 'react';
import { EMOJIS } from '../constants';

interface StatsProps {
  minesLeft: number;
  timer: number;
}

const Stats: React.FC<StatsProps> = ({ minesLeft, timer }) => {
  // Format timer to 000
  const formattedTime = Math.min(timer, 999).toString().padStart(3, '0');
  // Format mines to 000 (handle negative)
  const formattedMines = Math.max(-99, Math.min(minesLeft, 999)).toString().padStart(3, '0');

  return (
    <div className="flex justify-between items-center w-full max-w-[calc(100vw-2rem)] sm:w-auto min-w-[300px] bg-slate-800 text-red-500 font-mono text-3xl px-4 py-2 rounded-lg shadow-inner border-b-2 border-r-2 border-slate-700 mb-4 mx-auto">
      
      <div className="bg-black px-2 py-1 rounded border border-slate-700" title="剩余黄豆">
        {formattedMines}
      </div>

      <div className="text-base text-slate-400 font-sans hidden sm:block font-bold tracking-wider">
        黄豆危机 {EMOJIS.MINE}
      </div>

      <div className="bg-black px-2 py-1 rounded border border-slate-700" title="时间">
        {formattedTime}
      </div>
    </div>
  );
};

export default Stats;