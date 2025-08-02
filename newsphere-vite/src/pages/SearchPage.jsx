import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchNews } from '../services/newsApi';
import NewsCard from '../components/NewsCard';
import { Search, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const performSearch = async (query) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await searchNews(query);
      setArticles(response.articles);
    } catch (err) {
      setError(err.message || 'Failed to search news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search News</h1>
        <p className="text-gray-600 mb-6">
          Find the latest news articles by searching for keywords
        </p>

        <form onSubmit={handleSearch} className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </form>
      </div>

      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
            <span className="text-gray-600">Searching...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => performSearch(searchQuery)}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-gray-600">
              Found {articles.length} article{articles.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} index={index} />
            ))}
          </div>
        </div>
      )}

      {!loading && !error && articles.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
          <p className="text-gray-600">
            No articles found for "{searchQuery}". Try different keywords.
          </p>
        </div>
      )}

      {!loading && !error && !searchQuery && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Searching</h3>
          <p className="text-gray-600">
            Enter a keyword above to search for news articles.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;