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
        
        {/* Main Title - Always visible at the top */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-700 flex items-center gap-3 drop-shadow-sm mb-2">
          黄豆危机
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
        
        <footer className="mt-auto py-8 text-center space-y-3">
          <p className="text-xl sm:text-2xl font-bold text-slate-500 tracking-wider drop-shadow-sm">
            流汗黄豆？切割。
          </p>
          <p className="text-sm font-medium text-slate-400 opacity-70">
            避免点击 {EMOJIS.MINE} 以获得胜利
          </p>
          
          <a 
            href="https://github.com/tumuyan/yellow-fever" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors mt-2 opacity-80 hover:opacity-100"
          >
             <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
             </svg>
             <span>GitHub</span>
          </a>
        </footer>

      </div>
    </div>
  );
};

export default App;