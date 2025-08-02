import React from 'react';
import { CATEGORIES } from '../services/newsAPI';
import { capitalizeWords } from '../utils/helpers';

const CategoryFilter = ({ activeCategory, onCategoryChange, className = '' }) => {
  const categories = Object.values(CATEGORIES);

  // Category icons mapping
  const categoryIcons = {
    general: '📰',
    business: '💼',
    entertainment: '🎬',
    health: '🏥',
    science: '🔬',
    sports: '⚽',
    technology: '💻',
  };

  return (
    <div className={`category-filter ${className}`}>
      {/* Desktop: Horizontal scroll */}
      <div className="hidden md:block">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                category-button flex-shrink-0 flex items-center space-x-2
                ${activeCategory === category 
                  ? 'category-button-active' 
                  : 'category-button-inactive'
                }
              `}
              aria-pressed={activeCategory === category}
            >
              <span className="text-base">{categoryIcons[category]}</span>
              <span>{capitalizeWords(category)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: Grid layout */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                category-button flex items-center justify-center space-x-2 py-3
                ${activeCategory === category 
                  ? 'category-button-active' 
                  : 'category-button-inactive'
                }
              `}
              aria-pressed={activeCategory === category}
            >
              <span className="text-base">{categoryIcons[category]}</span>
              <span className="text-sm font-medium">{capitalizeWords(category)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category description */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Browse news by category to find stories that interest you most
        </p>
      </div>
    </div>
  );
};

export default CategoryFilter;