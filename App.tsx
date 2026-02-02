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
        // Smooth loading transition
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
      }
    };

    loadGames();
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        game.title.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeGame) {
    return <GamePlayer game={activeGame} onClose={() => setActiveGame(null)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onHome={handleHome}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {/* Featured Section - Only show on Home view */}
        {selectedCategory === 'All' && !searchQuery && featuredGames.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
              <h2 className="text-xl font-bold text-slate-100">Featured Releases</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredGames.map(game => (
                <div 
                  key={`featured-${game.id}`}
                  className="relative h-64 md:h-80 rounded-2xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-indigo-500/50 transition-all duration-500 shadow-2xl"
                  onClick={() => setActiveGame(game)}
                >
                  <img 
                    src={game.thumbnail} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    alt={game.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                    <span className="inline-block px-3 py-1 bg-indigo-600 text-[10px] font-bold text-white rounded-full mb-3 tracking-widest uppercase shadow-lg">
                      Hot Now
                    </span>
                    <h3 className="text-3xl font-extrabold text-white mb-2 drop-shadow-md">{game.title}</h3>
                    <p className="text-slate-200 text-sm max-w-md line-clamp-2 opacity-90">{game.description}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-indigo-600/10 backdrop-blur-[1px]">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
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

        {/* Browser Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
              <h2 className="text-xl font-bold text-slate-100">
                {searchQuery ? `Results for "${searchQuery}"` : `${selectedCategory} Library`}
              </h2>
            </div>
            <CategoryBar 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="bg-slate-900 aspect-video rounded-xl border border-slate-800" />
                  <div className="space-y-3 px-1">
                    <div className="h-4 bg-slate-900 rounded w-3/4" />
                    <div className="h-3 bg-slate-900 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} onClick={setActiveGame} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-300">Nothing found here</h3>
              <p className="text-slate-500 mt-2 max-w-sm">We couldn't find any games matching your current filters or search terms.</p>
              <button 
                onClick={handleHome}
                className="mt-8 px-6 py-2 bg-indigo-600/10 text-indigo-400 font-semibold rounded-full hover:bg-indigo-600/20 transition-all border border-indigo-500/20"
              >
                Reset Dashboard
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-auto border-t border-slate-900 bg-slate-950/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400">
                NovaArcade
              </span>
            </div>
            <p className="text-slate-500 text-xs max-w-xs text-center md:text-left leading-relaxed">
              Performance optimized web-arcade. Play hundreds of unblocked titles directly in your browser with zero tracking.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-[11px] uppercase tracking-[0.2em] font-bold text-slate-500">
            <div className="flex flex-col gap-4">
              <span className="text-slate-300">Gaming</span>
              <a href="#" className="hover:text-indigo-400 transition-colors">Popular</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Tags</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-slate-300">Help</span>
              <a href="#" className="hover:text-indigo-400 transition-colors">Support</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Safety</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-slate-300">Legal</span>
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 flex justify-center md:justify-start">
          <p className="text-slate-600 text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} NovaArcade. Designed for the open web.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;