
import React from 'react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onHome: () => void;
}

// Added React.FC and HeaderProps for proper TypeScript typing
const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onHome }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHome}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            NovaArcade
          </h1>
        </div>

        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search for games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full px-5 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button onClick={onHome} className="hover:text-white transition-colors">Browse</button>
          <a href="#" className="hover:text-white transition-colors">Popular</a>
          <a href="#" className="hover:text-white transition-colors">New</a>
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-500 transition-colors">
            Login
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
