import React from 'react';
import { ExternalLink, Clock, Share2 } from 'lucide-react';
import { 
  formatDate, 
  truncateText, 
  cleanDescription, 
  getValidImageUrl, 
  getDomainFromUrl,
  generateSharingUrls 
} from '../utils/helpers';

const NewsCard = ({ article, onClick, showShareButton = true }) => {
  if (!article) return null;

  const {
    title,
    description,
    urlToImage,
    publishedAt,
    source,
    url,
    author,
  } = article;

  const imageUrl = getValidImageUrl(urlToImage);
  const cleanedDescription = cleanDescription(description);
  const formattedDate = formatDate(publishedAt);
  const sourceDomain = getDomainFromUrl(url);

  const handleCardClick = (e) => {
    // Don't trigger card click if clicking on share button
    if (e.target.closest('.share-button')) return;
    
    if (onClick) {
      onClick(article);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    
    if (navigator.share && navigator.canShare) {
      navigator.share({
        title: title,
        text: cleanedDescription,
        url: url,
      }).catch((error) => {
        console.log('Error sharing:', error);
        // Fallback to manual sharing
        fallbackShare();
      });
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const sharingUrls = generateSharingUrls(article);
    // Open Twitter share as fallback
    if (sharingUrls.twitter) {
      window.open(sharingUrls.twitter, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article 
      className="news-card cursor-pointer group"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick(e);
        }
      }}
    >
      {/* Article Image */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title || 'News article image'}
          className="news-card-image group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = getValidImageUrl(null);
          }}
        />
        
        {/* Share Button Overlay */}
        {showShareButton && (
          <button
            onClick={handleShare}
            className="share-button absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm 
                     rounded-full shadow-lg opacity-0 group-hover:opacity-100 
                     transition-opacity duration-200 hover:bg-white"
            aria-label="Share article"
          >
            <Share2 className="h-4 w-4 text-gray-700" />
          </button>
        )}
      </div>

      {/* Article Content */}
      <div className="news-card-content">
        {/* Article Title */}
        <h3 className="news-card-title group-hover:text-primary-600 transition-colors">
          {title || 'Untitled Article'}
        </h3>

        {/* Article Description */}
        {cleanedDescription && (
          <p className="news-card-description">
            {truncateText(cleanedDescription, 120)}
          </p>
        )}

        {/* Article Metadata */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            {/* Source */}
            <span className="news-card-source">
              {source?.name || sourceDomain || 'Unknown Source'}
            </span>
            
            {/* Date */}
            {publishedAt && (
              <>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formattedDate}</span>
                </div>
              </>
            )}
          </div>

          {/* External Link Icon */}
          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
        </div>

        {/* Author (if available) */}
        {author && (
          <div className="mt-2 text-xs text-gray-500">
            By {author}
          </div>
        )}
      </div>
    </article>
  );
};

export default NewsCard;