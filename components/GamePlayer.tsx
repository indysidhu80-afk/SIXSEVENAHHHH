
import React from 'react';
import { Game } from '../types.ts';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

// Added React.FC and GamePlayerProps for proper TypeScript typing
const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">{game.title}</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest">{game.category}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button 
            onClick={onClose}
            className="bg-red-600/20 text-red-400 px-4 py-2 rounded font-medium hover:bg-red-600 hover:text-white transition-all"
          >
            Quit Game
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-black overflow-hidden relative">
        <iframe
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-none"
          allow="autoplay; fullscreen; keyboard"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default GamePlayer;
