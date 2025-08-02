import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import NewsCard from './components/NewsCard';
import LoadingSpinner, { NewsGridSkeleton } from './components/LoadingSpinner';
import ErrorMessage, { EmptyState } from './components/ErrorMessage';
import { useNews } from './hooks/useNews';
import { CATEGORIES } from './services/newsAPI';
import { ChevronDown } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const {
    articles,
    loading,
    error,
    totalResults,
    category,
    searchQuery,
    isSearchMode,
    hasMore,
    searchArticles,
    changeCategory,
    loadMore,
    refresh,
    clearSearch,
  } = useNews({
    initialCategory: CATEGORIES.general,
    pageSize: 12,
  });

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleSearch = useCallback((query) => {
    searchArticles(query);
  }, [searchArticles]);

  const handleClearSearch = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  const handleCategoryChange = useCallback((newCategory) => {
    changeCategory(newCategory);
    setIsMenuOpen(false); // Close mobile menu when category changes
  }, [changeCategory]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        onMenuToggle={handleMenuToggle}
        isMenuOpen={isMenuOpen}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay Informed with Real-Time News
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the latest headlines from trusted sources around the world. 
            Filter by category or search for specific topics to find what matters to you.
          </p>
          
          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
            initialValue={searchQuery}
            placeholder="Search for news articles..."
          />
        </section>

        {/* Category Filter */}
        {!isSearchMode && (
          <section className="mb-8">
            <CategoryFilter
              activeCategory={category}
              onCategoryChange={handleCategoryChange}
            />
          </section>
        )}

        {/* Search Results Header */}
        {isSearchMode && searchQuery && (
          <section className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Search Results for "{searchQuery}"
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {totalResults > 0 ? `Found ${totalResults.toLocaleString()} articles` : 'No articles found'}
                </p>
              </div>
              <button
                onClick={handleClearSearch}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Clear Search
              </button>
            </div>
          </section>
        )}

        {/* News Content */}
        <section>
          {/* Error State */}
          {error && !loading && (
            <ErrorMessage 
              error={error}
              onRetry={handleRetry}
              type={isSearchMode ? 'search' : 'general'}
            />
          )}

          {/* Empty State */}
          {!error && !loading && articles.length === 0 && (
            <EmptyState
              title={isSearchMode ? 'No Search Results' : 'No Articles Available'}
              message={
                isSearchMode 
                  ? `No articles found for "${searchQuery}". Try different keywords or browse by category.`
                  : 'No articles are available at the moment. Please try again later.'
              }
              onAction={isSearchMode ? handleClearSearch : handleRetry}
              actionText={isSearchMode ? 'Browse All News' : 'Refresh'}
            />
          )}

          {/* Loading State (Initial) */}
          {loading && articles.length === 0 && (
            <NewsGridSkeleton count={6} />
          )}

          {/* News Grid */}
          {articles.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {articles.map((article, index) => (
                  <NewsCard
                    key={`${article.url}-${index}`}
                    article={article}
                    showShareButton={true}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="inline-flex items-center px-6 py-3 bg-primary-500 text-white 
                             rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200 focus:outline-none focus:ring-2 
                             focus:ring-primary-500 focus:ring-offset-2"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="small" text="" className="mr-2 py-0" />
                        Loading More...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Load More Articles
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* End of Results */}
              {!hasMore && articles.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">
                    You've reached the end of the articles.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">NewsSphere</h3>
            <p className="text-sm text-gray-600 mb-4">
              Connecting Africa, One Headline at a Time
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#about" className="hover:text-primary-600 transition-colors">About</a>
              <a href="#privacy" className="hover:text-primary-600 transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-primary-600 transition-colors">Terms</a>
              <a href="#contact" className="hover:text-primary-600 transition-colors">Contact</a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              © 2024 NewsSphere. Built with React and powered by NewsAPI.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Developed by Immanuel Eshun Quansah - Accra Technical University
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
