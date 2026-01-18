import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import Board from './components/Board';
import Controls from './components/Controls';
import { EMOJIS } from './constants';
import { GameStatus } from './types';

const App: React.FC = () => {
  const {
    difficulty,
    board,
    gameStatus,
    timer,
    flagsUsed,
    setIsMouseDown,
    resetGame,
    onCellClick,
    onCellRightClick,
    setDifficulty
  } = useGame();

  const [isFlagMode, setIsFlagMode] = useState(false);

  // Calculate remaining mines for display
  const minesLeft = difficulty.mines - flagsUsed;

  const handleDifficultyChange = (diff: typeof difficulty) => {
    setDifficulty(diff);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-6 sm:py-10 overflow-y-auto px-4 font-sans text-slate-800">
      <div className="w-full max-w-fit flex flex-col items-center gap-6 sm:gap-8 transition-all duration-300">
        
        {/* Mobile Title - Hidden on Desktop */}
        <h1 className="text-2xl font-extrabold text-slate-700 flex items-center gap-2 md:hidden drop-shadow-sm">
          黄豆危机 <span className="text-3xl filter drop-shadow-md">{EMOJIS.MINE}</span>
        </h1>

        <Controls
          currentDifficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          isFlagMode={isFlagMode}
          toggleFlagMode={() => setIsFlagMode(!isFlagMode)}
          resetGame={() => resetGame()}
          minesLeft={minesLeft}
          timer={timer}
        />

        <div className="flex flex-col items-center relative z-10">
          
          <div className="relative group">
            {/* Subtle glow effect behind board */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition duration-700"></div>
            
            <div className="relative overflow-auto max-w-[95vw] max-h-[70vh] rounded-xl shadow-2xl border border-white/60 bg-white/40 backdrop-blur-md p-3 sm:p-4">
               {/* Board Container */}
              <Board
                board={board}
                onCellClick={onCellClick}
                onCellRightClick={onCellRightClick}
                gameStatus={gameStatus}
                isFlagMode={isFlagMode}
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
              />
            </div>
          </div>

          {/* Lose Message */}
          {gameStatus === GameStatus.LOST && (
             <div className="mt-8 px-8 py-4 bg-red-50/90 backdrop-blur text-red-600 border border-red-200 rounded-2xl shadow-xl animate-bounce font-bold text-xl text-center flex items-center gap-3 z-20">
               <span>我最讨厌流汗黄豆了</span>
               <span className="text-3xl filter drop-shadow">{EMOJIS.MINE}</span>
             </div>
          )}

          {/* Win Message */}
           {gameStatus === GameStatus.WON && (
             <div className="mt-8 px-8 py-4 bg-green-50/90 backdrop-blur text-green-600 border border-green-200 rounded-2xl shadow-xl font-bold text-xl text-center flex items-center gap-3 z-20">
               <span>完美切割！</span>
               <span className="text-3xl filter drop-shadow">{EMOJIS.HAPPY}</span>
             </div>
          )}
        </div>
        
        <footer className="mt-auto py-8 text-center space-y-2">
          <p className="text-xl sm:text-2xl font-bold text-slate-500 tracking-wider drop-shadow-sm">
            流汗黄豆？切割。
          </p>
          <p className="text-sm font-medium text-slate-400 opacity-70">
            避免点击 {EMOJIS.MINE} 以获得胜利
          </p>
        </footer>

      </div>
    </div>
  );
};

export default App;