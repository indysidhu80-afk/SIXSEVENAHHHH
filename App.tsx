
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.tsx';
import CategoryBar from './components/CategoryBar.tsx';
import GameCard from './components/GameCard.tsx';
import GamePlayer from './components/GamePlayer.tsx';
import { Game, Category } from './types.ts';

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetch('./games.json');
        if (!response.ok) throw new Error('Failed to load games data');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error('Error loading games:', error);
      } finally {
        // Adding a slight delay for smooth transition
        setTimeout(() => setLoading(false), 500);
      }
    };

    loadGames();
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  const featuredGames = useMemo(() => {
    return games.filter(g => g.isFeatured);
  }, [games]);

  const handleHome = () => {
    setActiveGame(null);
    setSearchQuery('');
    setSelectedCategory('All');
  };

  if (activeGame) {
    return <GamePlayer game={activeGame} onClose={() => setActiveGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onHome={handleHome}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {selectedCategory === 'All' && !searchQuery && featuredGames.length > 0 && (
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Featured Games
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredGames.map(game => (
                <div 
                  key={game.id}
                  className="relative h-64 md:h-80 rounded-2xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 shadow-xl"
                  onClick={() => setActiveGame(game)}
                >
                  <img 
                    src={game.thumbnail} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={game.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    <span className="inline-block px-3 py-1 bg-indigo-600 text-[10px] font-bold text-white rounded-full mb-3 tracking-widest uppercase">
                      Featured
                    </span>
                    <h3 className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg">{game.title}</h3>
                    <p className="text-slate-200 text-sm max-w-md line-clamp-2 opacity-90">{game.description}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600/10 backdrop-blur-[2px]">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              {searchQuery ? `Results for "${searchQuery}"` : `${selectedCategory} Games`}
            </h2>
            <CategoryBar 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="bg-slate-800 aspect-video rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-800 rounded w-3/4" />
                    <div className="h-3 bg-slate-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} onClick={setActiveGame} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 border border-slate-800 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-200">No games found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
              <button 
                onClick={handleHome}
                className="mt-6 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors border-b border-indigo-400/20 hover:border-indigo-300"
              >
                Reset Dashboard
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-20 border-t border-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2 opacity-80">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight">NovaArcade</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Your premium destination for unblocked high-performance web gaming. Fast, secure, and always free.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-sm">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">Explore</h4>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Popular</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Categories</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">Support</h4>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Contact</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">FAQ</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">Legal</h4>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex justify-center md:justify-start">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} NovaArcade Gaming Network. Performance optimized for modern browsers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
