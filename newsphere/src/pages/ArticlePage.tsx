import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ExternalLink, Globe } from 'lucide-react';
import { NewsArticle } from '../types/news';

const ArticlePage: React.FC = () => {
  const location = useLocation();
  const article = location.state?.article as NewsArticle;

  if (!article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-6">
          The article you're looking for could not be found.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {article.urlToImage && (
          <div className="relative">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-primary-600 text-white text-sm px-3 py-1 rounded-full">
                {article.source.name}
              </span>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              
              {article.author && (
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>{article.source.name}</span>
              </div>
            </div>
          </header>

          {article.description && (
            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {article.description}
              </p>
            </div>
          )}

          {article.content && (
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {article.content.replace(/\[\+\d+ chars\]$/, '')}
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 btn-primary"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Read Full Article</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;