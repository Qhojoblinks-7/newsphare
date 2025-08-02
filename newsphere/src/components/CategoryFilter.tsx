import React from 'react';
import { NewsCategory } from '../types/news';

interface CategoryFilterProps {
  selectedCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
}

const categories: { value: NewsCategory; label: string; icon: string }[] = [
  { value: 'general', label: 'General', icon: '📰' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'health', label: 'Health', icon: '🏥' },
  { value: 'education', label: 'Education', icon: '📚' },
  { value: 'business', label: 'Business', icon: '💼' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'science', label: 'Science', icon: '🔬' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedCategory === category.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;