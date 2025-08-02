import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ExternalLink } from 'lucide-react';

const NewsCard = ({ article, index }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <article className="card overflow-hidden">
      <div className="relative">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
            {article.source.name}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h3>
        
        {article.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {truncateText(article.description, 150)}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            {article.author && (
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{truncateText(article.author, 20)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Link
            to={`/article/${index}`}
            state={{ article }}
            className="btn-primary text-sm"
          >
            Read More
          </Link>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Original</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;