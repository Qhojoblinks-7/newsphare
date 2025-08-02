import React from 'react';
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

const ErrorMessage = ({ 
  error, 
  onRetry, 
  type = 'general',
  className = '' 
}) => {
  const getErrorDetails = () => {
    if (!error) return { icon: AlertCircle, title: 'Unknown Error', message: 'Something went wrong' };

    const errorString = typeof error === 'string' ? error.toLowerCase() : '';

    // Network errors
    if (errorString.includes('network') || errorString.includes('fetch')) {
      return {
        icon: WifiOff,
        title: 'Connection Error',
        message: 'Unable to connect to the internet. Please check your connection and try again.',
      };
    }

    // API rate limit errors
    if (errorString.includes('rate limit') || errorString.includes('too many requests')) {
      return {
        icon: AlertCircle,
        title: 'Rate Limit Exceeded',
        message: 'Too many requests. Please wait a moment before trying again.',
      };
    }

    // API key errors
    if (errorString.includes('api key') || errorString.includes('unauthorized')) {
      return {
        icon: AlertCircle,
        title: 'API Configuration Error',
        message: 'There seems to be a configuration issue. Please try again later.',
      };
    }

    // Search errors
    if (type === 'search') {
      return {
        icon: AlertCircle,
        title: 'Search Error',
        message: 'Unable to search for articles at the moment. Please try a different search term.',
      };
    }

    // Default error
    return {
      icon: AlertCircle,
      title: 'Something Went Wrong',
      message: typeof error === 'string' ? error : 'An unexpected error occurred. Please try again.',
    };
  };

  const { icon: Icon, title, message } = getErrorDetails();

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* Error Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <Icon className="h-8 w-8 text-red-600" />
      </div>

      {/* Error Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Error Message */}
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white 
                   rounded-lg hover:bg-primary-600 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      )}

      {/* Additional Help Text */}
      <div className="mt-6 text-sm text-gray-500">
        <p>If this problem persists, please try:</p>
        <ul className="mt-2 space-y-1">
          <li>• Checking your internet connection</li>
          <li>• Refreshing the page</li>
          <li>• Trying again in a few minutes</li>
        </ul>
      </div>
    </div>
  );
};

// Empty state component for when no articles are found
export const EmptyState = ({ 
  title = 'No Articles Found', 
  message = 'Try adjusting your search or category filter.',
  onAction,
  actionText = 'Browse All News',
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* Empty State Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <Wifi className="h-8 w-8 text-gray-400" />
      </div>

      {/* Empty State Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Empty State Message */}
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>

      {/* Action Button */}
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white 
                   rounded-lg hover:bg-primary-600 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;