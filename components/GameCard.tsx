
import React from 'react';
import { Game } from '../types.ts';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

// Added React.FC and GameCardProps to fix the "key" property error in TSX
const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      className="group bg-slate-800 rounded-xl overflow-hidden cursor-pointer border border-transparent hover:border-indigo-500 transition-all hover:-translate-y-1"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] uppercase font-bold text-indigo-300 tracking-wider">
          {game.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-100 mb-1 group-hover:text-indigo-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
