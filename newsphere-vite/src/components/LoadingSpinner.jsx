import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`animate-spin text-primary-600 ${sizeClasses[size]}`} />
      <span className="text-gray-600">{message}</span>
    </div>
  );
};

export default LoadingSpinner;