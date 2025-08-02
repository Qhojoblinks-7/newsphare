/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Get domain from URL
 * @param {string} url - Full URL
 * @returns {string} Domain name
 */
export const getDomainFromUrl = (url) => {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
};

/**
 * Clean article description
 * @param {string} description - Article description
 * @returns {string} Cleaned description
 */
export const cleanDescription = (description) => {
  if (!description) return '';
  
  // Remove common unwanted patterns
  return description
    .replace(/\[.*?\]/g, '') // Remove [+123 chars] patterns
    .replace(/Read more.*$/i, '') // Remove "Read more" endings
    .replace(/…$/, '') // Remove trailing ellipsis
    .trim();
};

/**
 * Generate placeholder image URL
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} Placeholder image URL
 */
export const getPlaceholderImage = (width = 400, height = 300) => {
  return `https://via.placeholder.com/${width}x${height}/f3f4f6/6b7280?text=No+Image`;
};

/**
 * Validate and clean image URL
 * @param {string} imageUrl - Image URL to validate
 * @returns {string} Valid image URL or placeholder
 */
export const getValidImageUrl = (imageUrl) => {
  if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined') {
    return getPlaceholderImage();
  }
  
  // Check if URL is valid
  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    return getPlaceholderImage();
  }
};

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Check if string contains any of the specified keywords
 * @param {string} text - Text to search in
 * @param {string[]} keywords - Keywords to search for
 * @returns {boolean} True if any keyword is found
 */
export const containsKeywords = (text, keywords) => {
  if (!text || !keywords || keywords.length === 0) return false;
  
  const lowerText = text.toLowerCase();
  return keywords.some(keyword => 
    lowerText.includes(keyword.toLowerCase())
  );
};

/**
 * Generate article sharing URL
 * @param {Object} article - Article object
 * @returns {Object} Sharing URLs for different platforms
 */
export const generateSharingUrls = (article) => {
  if (!article || !article.url) return {};
  
  const encodedUrl = encodeURIComponent(article.url);
  const encodedTitle = encodeURIComponent(article.title || '');
  const encodedDescription = encodeURIComponent(
    truncateText(cleanDescription(article.description), 100)
  );
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };
};