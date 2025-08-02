import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { debounce } from '../utils/helpers';

const SearchBar = ({ onSearch, onClear, initialValue = '', placeholder = "Search news..." }) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        onSearch(query.trim());
      } else if (onClear) {
        onClear();
      }
    }, 500),
    [onSearch, onClear]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  // Handle clear button
  const handleClear = () => {
    setSearchQuery('');
    if (onClear) {
      onClear();
    }
  };

  // Update local state when initialValue changes
  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg 
                     bg-white text-gray-900 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     transition-colors duration-200"
            aria-label="Search news articles"
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center
                       text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search Button (hidden but functional for form submission) */}
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      {/* Search Tips */}
      {!searchQuery && (
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-500">
            Try searching for topics like "technology", "health", or "education"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;