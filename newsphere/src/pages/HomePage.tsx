import React, { useState, useEffect } from 'react';
import { getTopHeadlines } from '../services/newsApi';
import { NewsArticle, NewsCategory } from '../types/news';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import { Loader2, AlertCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('general');

  const fetchNews = async (category: NewsCategory) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTopHeadlines(category);
      setArticles(response.articles);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (category: NewsCategory) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
          <span className="text-gray-600">Loading news...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading News</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchNews(selectedCategory)}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to NewsSphere
        </h1>
        <p className="text-gray-600">
          Stay informed with the latest news from around the world
        </p>
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found for this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;