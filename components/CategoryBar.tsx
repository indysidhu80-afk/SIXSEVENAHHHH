
import React from 'react';
import { CATEGORIES, Category } from '../types.ts';

interface CategoryBarProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

// Added React.FC and CategoryBarProps for proper TypeScript typing
const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
